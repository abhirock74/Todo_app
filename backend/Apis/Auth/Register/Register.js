const User = require('../../../Models/user')
const express = require('express')
const reg = express.Router();

reg.post('/', async (req, res)=>{
   try {
    let {name , email , password , gender} = req.body;
    if(!name || !email || !password || !gender){
        return res.status(400).json({ message: 'name, email, password and gender are required' });
    }else{
        let isUser = await User.findOne({email})
        if(isUser){
            return res.status(200).json({message:'User already exits' , isUser})
        }else{
            let newUser = await User.create({name , email , password , gender})
            return res.status(200).json({message:'User created' , newUser})
        }
       
    }
   } catch (error) {
    return res.status(500).json({message:'internal server error' , error})
   }
    
})

module.exports = reg;