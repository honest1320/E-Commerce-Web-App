const CryptoJs = require("crypto-js");
const express = require("express");
const User = require("../models/User");
const router = express.Router();

const { verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")

//UPDATE info of a user
router.put("/:id", verifyTokenAndAuthorization, async(req,res)=>{
    if (req.body.password) { //trying to change password
        req.body.password = CryptoJs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    }

    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, 
            //$set is a method that updates, new display updated data
            { $set: req.body }, {new: true}
        )
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted..")
    } catch (error) {
        res.status(500).json(error);
    }
})

//GET USER.....only for the admins
router.get("/find/:id", verifyTokenAndAdmin, async(req,res)=>{
    try {
        const user = await User.findById(req.params.id)

        const {password, ...others} = user._doc //Destructuring user

        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error);
    }
})

//GET ALL USERS.....only for the admins
router.get("/", verifyTokenAndAdmin, async(req,res)=>{
    const query = req.query.new;
    
    try {
        const users = query ? await User.find().sort({_id: "desc"}).limit(5): await User.find()
        res.status(200).json(users)

    } catch (error) {
        res.status(500).json(error);
    }
})

//GET USER STATS.....only for the admins
router.get("/stats", verifyTokenAndAdmin, async(req,res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1))
    
    try {
        const data = await User.aggregate([

           {$match: {createdAt: {$gte: lastYear}}}, //match if createdAt(created variable) is greater than last year
           {
            $project: {month: {$month: "$createdAt"}} //first month is a created variable, theeen extract the month($month) from the $createdAt field in DB
           },
           {$group: {_id: "$month", total: {$sum: 1}}} //_id here is just a variable...sum:1 sums errything

        ])

        res.status(200).json(data)

    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports = router;
