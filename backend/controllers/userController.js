const User = require('../models/User'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register user

exports.registerUser = async (req,res)=>{
    try{
        const {username,email,password} = req.body;
        let userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message: "User already exists"});  
        }

        // Hash password
        const hasedPassword = await bcrypt.hash(password,10);

        // Create user
        const newUser = new User({username,email,password:hasedPassword});
        await newUser.save();

        res.status(201).json({message: "User created successfully"});   

    }catch(error){
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
};

// Login user

exports.LoginUser = async (req,res)=>{
    try{
        const {email,password} = req.body;

        // Check if user exists

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message: "User does not exist"});  
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({message: "Incorrect password"});  
        }

        // Create JWT token

        const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn: '1d'});    

        res.status(200).json({message: "Login successful",token,user});
    
    }catch(error){
        res.status(500).json({message: "error logging in"},error);
    }
};