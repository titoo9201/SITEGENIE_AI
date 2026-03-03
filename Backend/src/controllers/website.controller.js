const websiteModel = require("../MODELS/website.model");
const userModel = require("../MODELS/user.models");
const { masterPrompt } = require("../utils/prompt.utils");
const { generateResponse } = require("../services/openrouter.services");
const { extractJson: extractData } = require("../utils/extractjson.utils");
const { formatHTML } = require("../utils/htmlFormat.utils");

async function generateWebsite(req, res) {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "prompt is required" });
    }

    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    if (user.credits < 40) {
      return res.status(403).json({ message: "not enough credits" });
    }

    const finalPrompt = `
You are a professional web developer AI.

User Request:
${prompt}

Return JSON only:
{
 "message":"",
 "code":"FULL HTML WEBSITE"
}

Important:
- Return complete website code
- Make responsive design
- Do not explain anything
`;

    let raw = "";
    let parsed = null;

    for (let i = 0; i < 3; i++) {
      raw = await generateResponse(finalPrompt);
      parsed = await extractData(raw);

      if (parsed && parsed.code) break;
    }

    if (!parsed || !parsed.code) {
      return res.status(200).json({
        message: "AI could not generate website",
        websiteId: null,
        remaingCredits: user.credits,
      });
    }

    const website = await websiteModel.create({
      user: user._id,
      title: prompt.slice(0, 60),
      code: formatHTML(parsed.code), // ⭐ IMPORTANT
      conversation: [
        { role: "user", content: prompt },
        { role: "ai", content: parsed.message },
      ],
    });

    user.credits -= 40;
    await user.save();

    return res.status(201).json({
      message: "website generated successfully",
      websiteId: website._id,
      remaingCredits: user.credits,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
}

async function getWebsite(req, res) {
  try {
    const website = await websiteModel.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!website) {
      return res.status(400).json({
        message: "website not found",
      });
    }
    return res.status(200).json({
      message: "website found",
      website,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error ",
    });
  }
}

async function codeChanges(req, res) {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({
        message: "prompt is required ",
      });
    }

    const website = await websiteModel.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!website) {
      return res.status(400).json({
        message: "website not found",
      });
    }
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(400).json({
        message: "user not found ",
      });
    }
    if (user.credits < 5) {
      return res.status(403).json({
        message: "not enough credits",
      });
    }
    const updatePrompt = `
UPDATE THIS HTML WEBSITE.

CURRENT CODE:
${website.code}

USER REQUEST:
${prompt}

RETURN RAW JSON ONLY:
{
  "message": "Short confirmation",
  "code": "<UPDATED FULL HTML>"
}
`;
    let raw = "";
    let parsed = null;
    for (let i = 0; i < 2 && !parsed; i++) {
      raw = await generateResponse(updatePrompt);
      parsed = await extractData(raw);
      if (!parsed) {
        raw = await generateResponse(
          updatePrompt +
            "\n\n Remember to follow the output format and return only raw json",
        );
        parsed = await extractData(raw);
      }
    }
    if (!parsed || !parsed.code) {
      console.log("ai returned invalid response");
      return res.status(500).json({
        message: "ai returned invalid response",
      });
    }
    website.conversation.push(
      { role: "user", content: prompt },
      { role: "ai", content: parsed.message },
    );
    website.code = parsed.code;
    await website.save();
    user.credits = user.credits - 5;
    await user.save();
    return res.status(200).json({
      message: parsed.message,
      code: parsed.code,

      remaingCredits: user.credits,
    });
  } catch (error) {
   console.log("code change error", error);
return res.status(500).json({
  message: "internal server error",
});
  }
}

async function allWebsite(req,res)
{try {
  const allWebsite= await websiteModel.find({
    user:req.user._id
  })
  return res.status(200).json(allWebsite)
} catch (error) {
    console.log("code change error", error);
return res.status(500).json({
  message: "internal server error",
});
}

}

async function deployWebsite(req, res) {
  try {
    const website = await websiteModel.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!website) {
      return res.status(400).json({
        message: "website not found",
      });
    }

    website.deployed = true;
    website.deployurl = `${process.env.FRONTEND_URL}/site/${website.slug}`;

    await website.save();

    return res.status(200).json({
      url: website.deployurl,
    });

  } catch (error) {
    console.log("deploy error", error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
}

async function findBySlug(req,res) {
  try {
    const website = await websiteModel.findOne({
      slug: req.params.slug,
      deployed: true
    });

    if (!website) {
      return res.status(404).json({ message: "site not found" });
    }

    return res.status(200).json({
      code: website.code
    });

  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }  
}
module.exports = {
  generateWebsite,
  getWebsite,
  codeChanges,
  allWebsite,
  deployWebsite,
  findBySlug
};
