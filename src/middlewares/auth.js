const User = require('../models/User')
const jwt = require('jsonwebtoken')

const auth = async (req,res, next) =>{

    try{

        const token = req.header("Authorization").replace('Bearer ', '');

        const decoded = await jwt.verify(token, 'tasksecret');
        console.log(decoded)

        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})

        if(user){
            console.log("Yes User")
            req.user = user

            req.token = token
        }else{
            console.log("No user")
            throw new Error();
        }

        next()

    }catch(e){
        //console.log(e)
        res.status(401).send("{error: 'Please authenticate ' }")
    }
    next()
}


module.exports = auth