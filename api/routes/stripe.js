const express = require("express")
const router = express.Router();
const stripe = require("stripe")("sk_test_51MC0UUHz4zy12I5lot1Gqa2Jqpg7IiFW4bvyeAMYguqiO66eo5QNeh6QaYFEx23kXBQa2Hpm2PNIZuxu7LHaquPa00FXRH7HnQ");

router.post("/payment", (req,res)=>{
    stripe.charges.create({
        source: req.body.tokenId,
        amount:req.body.amount,
        currency: "usd"
    }, (stripeErr, stripeRes)=>{
            if (stripeErr) {
                res.status(500).json(stripeErr)
            }else{
                res.status(200).json(stripeRes)
            }
    })
})



module.exports = router;