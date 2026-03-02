const {PLANS:plans}=require("../services/plan.services")
const {stripe}=require("../services/stripe.services")    


async function billing(req,res) {
 try {

  if(!req.user){
   return res.status(401).json({message:"unauthorized"})
  }

  const {planType}=req.body
  const userId=req.user._id

  const allowedPlans=["student","pro"]

  if(!allowedPlans.includes(planType)){
   return res.status(400).json({
    message:"invalid plan"
   })
  }

  const plan=plans[planType]

  const session = await stripe.checkout.sessions.create({
   mode:"payment",
   payment_method_types:["card"],
   line_items:[
    {
     price_data:{
      currency:"INR",
      product_data:{
       name:`SiteGenie.ai ${planType.toUpperCase()} Plan`
      },
      unit_amount:plan.price*100
     },
     quantity:1
    }
   ],
   metadata:{
    userId:userId.toString(),
    credits:plan.credits,
    plan:plan.plan
   },

   success_url:`${process.env.FRONTEND_URL}/dashboard`,
   cancel_url:`${process.env.FRONTEND_URL}/pricing`
  })

  return res.status(200).json({
   sessionUrl:session.url
  })

 } catch(error){
  console.log(error)
  return res.status(500).json({
   message:"internal server error"
  })
 }
}


module.exports={
    billing
}
