const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const verifyToken =(req,res,next)=>{
    const authHeader = req.headers.token

    if(authHeader){//If authHeader is even present

        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SEC, (err, user)=>{
            if (err) res.status(403).json("Invalid Token")
            req.user = user;
            next(); //leaves this function then goes to the router in user.js
        }, 
        // {expiresIn: "4h"}
        )
    }else{
        return res.status(401).json("You ain't verified")
    }
}

//verification for user OR admin to edit personal details
const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        }else{
            res.status(403).json("No permission to update!");
        }
    })
    
}

//verification only for the admins
const verifyTokenAndAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if (req.user.isAdmin) {
            next();
        }else{
            res.status(403).json("No permission to update!");
        }
    })
    
}

module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin};