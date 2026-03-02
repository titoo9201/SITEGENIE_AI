const userModel=require("../MODELS/user.models")
const {stripe}=require("../services/stripe.services")    
async function stripeWebhook(req,res) {
    const sig=req.headers["stripe-signature"]  
    let event
    try {
        event= stripe.webhooks.constructEvent(
         req.body,
         sig,
         process.env.STRIPE_WEBHOOK_KEY
        )
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"webhook error"
        })
        
    }
    if(event.type==="checkout.session.completed"){
        const session =event.data.object
        const userId=session.metadata.userId
        const credits = Number(session.metadata.credits)
        const plan=session.metadata.plan

           await userModel.findByIdAndUpdate(userId,{
 $inc:{credits:credits},
 $set:{plan:plan}
})
    }
    return res.status(200).json({       
        message:"webhook received"
    })
    
}
module.exports={    
    stripeWebhook
}
