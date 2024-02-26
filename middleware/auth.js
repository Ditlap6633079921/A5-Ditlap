const jwt = require('jsonwebtoken');
const User = require('../models/User');

//Protect routes
exports.protect = async(req,res,next)=>{
    let token;

    if(req.header,authorization && req.header.authorization.startWith('Bearer')){
        token = req.header.authorization.split(' ')[1];
    }


    //make sure token exist
    if(!token){
        return res.status(401).json({success:false, message: 'Not authorize to access this route'});
    }

    try{
        //Verify Token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decode);
        req.user=await User.findById(decode.id);
        next();
    }
    catch(err){
        console.log(err.stack);
        return res.status(401).json({success:false, message:'Not authorize to access this route'});
    }
}

//Grant access to specific roles
exports.authorize=(...roles)=>{
        return(req,res,next)=>{
            if(!roles.includes(req.user.role)){
                return res.status(403).json({
                    success:false,
                    message:`User role ${req.user.role} is not authorized to access this route`
                });
            }
            next();
        }
}