const jwt = require('jsonwebtoken');

const protect = async (req,res,next) =>{
    const token = req.headers.authorization?.split(' ')[1]; // Bearer token
    if(!token){
        res.status(402).json({message: "Not authorized"});  
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);   
        req.user = decoded; // storing user details in req.user object
        next();
    }catch(error){
        res.status(401).json({message: "Not authorized"});
    }

};

module.exports = {protect};
