const express = require('express');
const cookieParser = require('cookie-parser')
const userModel = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require ('dotenv')


dotenv.config();
const app = express()


exports.getAllUsers = async(req,res)=>{
    try{
        const users = await userModel.find({})
          return res.status(200).send({
            userCount:users.length,
            success: true,
            message: 'all users found',
            users
          })  
        
    }
    catch(err){
    console.log(err)
    return res.status(500).send({
        success: false,
        message: 'error in getting all users',
        error
    })
}

     
}

exports.registerController= async(req,res)=>{
    try{
        const {username,email,password} = req.body
        if(!username || !email || !password)
         return res.status(400).send({
            success:false,
            message:'Please enter fields'
        })
        //existing user
        const existingUser = await userModel.findOne({email})
        if(existingUser)
        return res.status(401).send({
            success: false,
            message:'user already registered'
        })
        const hashedPassword = await bcrypt.hash(password,10)
      
        //save new user

        const user = new userModel({
            username,email,password: hashedPassword
        })
        await user.save()
        return res.status(201).send({
            success:true,
            message:'new user registered',
            username,email
        })
    }catch(error){
        console.log(error)
        return res.status(500).send({
            message:'Error in Register Callback',
            success:false,
            error
        })
    }

}

exports.loginController=async(req,res)=>{
    try{
        const {email,password}= req.body
        if(!email || !password){
            return res.status(401).send({
                success:false,
                message:'Please enter your email'
            })
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(401).send({
                success:false,
                message:'email not registered'
            })
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(isMatch){
            const token = jwt.sign(user.toJSON(),process.env.secretkey,{expiresIn:'15d'})
            res.cookie('token', token, { httpOnly: true });
          

            return res.status(200).send({
                success:true,
                message:'Login successful',
               
            })
        }
        else{
            return res.status(401).send({
                success:false,
                message:'Invalid username or password'
            })
        }
      
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success: false,
            message:'Error in Login Callback',
            error
        })
    }

}
