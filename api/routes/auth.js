
//AUTH is for registering and login ONLY......works with CryptoJS....

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")


//REGISTER
router.post("/register", async (req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    })
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json(error)
    }
    

})

//LOGIN
router.post("/login", async (req,res)=>{
    try {
        const user = await User.findOne({username: req.body.username});
        !user && res.status(401).json("Wrong Credentials")

        const OGpassword  = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8);

        OGpassword !== req.body.password && 
            res.status(401).json("Wrong Password");



         //accessToken is generated, then u copy it then use it in GET, DELETE, PUT etc
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SEC)



        const {password, ...others} = user._doc //Destructuring user
        res.status(200).json({...others, accessToken});//Destructuring again...to hide the word other & puts accToken inside the {}...weird tho
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router;
