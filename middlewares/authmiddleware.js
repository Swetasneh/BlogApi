const express = require('express');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');




const app = express();
app.use(cookieParser());
exports.requireLogin = async(req,res,next)=>{
    try{
        
        const decode = jwt.verify(req.headers.authorization,process.env.secretkey)
        next()
    }
    catch(err){
        console.log(err);

    }
    
}
