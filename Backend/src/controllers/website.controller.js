
const websiteModel = require("../models/website.model");
const userModel = require("../MODELS/user.models");
const { masterPrompt } = require("../utils/prompt.utils");
const {generateResponse} =require("../services/openrouter.services")
const { extractJson: extractData } = require("../utils/extractjson.utils")

async function generateWebsite(req, res) {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({
        message: "prompt is required ",
      });
    }
    const user = await userModel.findById(req.user._id)
    if (!user) {
      return res.status(400).json({
        message: "user not found ",
      });
    }
    if(user.credits<40)
    {
        return res.status(403).json({
            message:"not enough credits"
        })
    }

    const finalPrompt = masterPrompt.replace("USER_PROMPT",prompt)
    let raw=""
    let parsed=null
    for(let i=0;i<2 && !parsed;i++)
    {
        raw= await generateResponse(finalPrompt)
        parsed= await extractData(raw)
        if(!parsed)
        {
            raw= await generateResponse(finalPrompt+"\n\n Remember to follow the output format and return only raw json")
            parsed= await extractData(raw)

        }
    }
    if (!parsed || !parsed.code) {
        console.log("ai returned invalid response");
        return res.status(500).json({
            message: "ai returned invalid response"
        });
    }
    const website =await websiteModel.create({
        user: user._id,
        title:prompt.slice(0,20),
        code:parsed.code,
        conversation:[
            {
                role:"ai",    
                content:parsed.message
            },
            {
                role:"user",
                content:prompt
            }
        ]

  })
  user.credits=user.credits-40
  await user.save()
  return res.status(201).json({
    message:"website generated successfully",
    websiteId:website._id,
    remaingCredits:user.credits
  })

  } catch (error) {
    console.log("generate website error",error);
    return res.status(500).json({
      message: "something went wrong"
    })
  }
}


module.exports = {
  generateWebsite,
};  
