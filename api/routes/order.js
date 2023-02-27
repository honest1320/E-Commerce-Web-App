const CryptoJs = require("crypto-js");
const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

const { verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")

//CREATE

router.post("/", verifyToken, async(req, res)=>{
    const newOrder = new Order(req.body)

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder)
    } catch (error) {
        res.status(500).json(error)
    }
})



//UPDATE
router.put("/:id", verifyTokenAndAdmin, async(req,res)=>{

    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, 
            //$set is a method that updates, new display updated data
            { $set: req.body }, {new: true}
        )
        res.status(200).json(updatedOrder)
    } catch (error) {
        res.status(500).json(error)
    }
})

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async(req,res)=>{
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted..")
    } catch (error) {
        res.status(500).json(error);
    }
})

//GET USER ORDERS.....only for the admins
router.get("/find/:userId",verifyTokenAndAuthorization, async(req,res)=>{
    try {
        const orders = await Order.find({userId: req.params.userId})

        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error);
    }
})

//GET ALL 
router.get("/", verifyTokenAndAdmin, async(req,res)=>{
    
    try {

        const orders = await Order.find()
 
        res.status(200).json(orders)

    } catch (error) {
        res.status(500).json(error);
    }
})

//GET MONTHLY INCOME

router.get("/income",verifyTokenAndAdmin, async(req,res)=>{
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1))
    const previousMonth = new Date(date.setMonth(lastMonth.getMonth()-1))

    try {
        const income = await Order.aggregate([
            {$match:{createdAt: {$gte: previousMonth}, ...(productId && {
                products: {$elemMatch: {productId: productId}},
            })}},
            {
                $project: {month: {$month: "$createdAt"}, sales: "$amount"},
            },
            {$group: {_id: "$month", total:{ $sum:"$sales"}}}
        ])
        
        res.status(200).json(income)

    } catch (error) {
        res.status(500).json(error);
    }

})



module.exports = router;
