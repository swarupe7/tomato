const authController=require("express").Router()
const User=require('../models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
authController.post('/register',async(req,res)=>{
    try{
        const isExisting=await User.findOne({email:req.body.email});
        if(isExisting){
            throw new Error('already account exist');
        }
        const hashedPassword=await bcrypt.hash(req.body.password,10);
        const newUser=await User.create({...req.body,password:hashedPassword});
        const {password,...others}=newUser._doc;
        const token=jwt.sign({id:newUser._id,isAdmin:newUser.isAdmin},process.env.Jwt_SECRET,{expiresIn:'5h'});
        return res.status(201).json({others,token});

    }catch(error){
        res.status(500).json(error.message);
    }
})


authController.post('/login',async(req,res)=>{

    try{
        const user=await User.findOne({email:req.body.email});
        if(!user){
            throw new Error('please register first');
        }
        const comparePassword=await bcrypt.compare(req.body.password,user.password);
        if(!comparePassword){
            throw new Error('wrong password');
        }
        
        const {password,...others}=user._doc;
        const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.Jwt_SECRET,{expiresIn:'5h'});
        return res.status(201).json({others,token});

    }catch(error){
        res.status(500).json(error.message);
    }


})

module.exports=authController;