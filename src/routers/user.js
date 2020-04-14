const express = require('express');
const router = new express.Router()
const User = require('../models/User')
const auth = require('../middlewares/auth')

router.post('/users',async (req,res)=>{

    const user= new User(req.body);
   

    try {
        await user.save()
        const token = await user.generateUserToken();
        res.status(201).send({user, token})
    }catch(e) {
        res.status(402).send(e)
    }
 
})

router.get('/users',auth, async (req,res)=>{

    try{
        const users =  await User.find({})
        res.send(users)
    }catch(e){
        res.status(400).send(e)
    }
 
})
router.get('/users/me',auth, async (req,res)=>{

    res.send(req.user)
 
})


router.get('/users/logout', auth, async (req, res)=>{

    try{

        req.user.tokens = req.user.tokens.filter((tokenObj)=>{
            return tokenObj.token !== req.token
        })

        console.log("Got here")
         req.user.save();

        res.status(200).send({message: 'User logged out'})

    }catch(e){

        console.error(e)
        res.status(500).send({error: 'Oops an error occured'})
    }

})


//logout user from all sesssions

router.get('/users/logoutAll', auth, async (req,res)=>{

    try{
        req.user.tokens = []

         req.user.save()
         res.status(200).send({message: 'logged out from all sessions'})

    }catch(e){

        res.status(417).send({error: 'Expectation failed'})
    }
})


router.get('/users/:id',async (req,res)=>{
    const _id = req.params.id;
    try {
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send("User does not exist")
        }
        res.send(user)
    }catch(e){
        res.status(500).send()
    }
})

router.patch('/users/:id', async (req, res)=>{

    const updates = Object.keys(req.body)
    const allowedParams = ['name','email','age','password']
    const isValid = updates.every((update)=> allowedParams.includes(update))

    if(!isValid){
        return res.status(403).send({"error": "Invalid parameters"})
    }
    try {
        // const user = await  User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        const user = await  User.findById(req.params.id)

        updates.forEach(update => user[update] = req.body[update] );

        await user.save()

        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
   
})


//deleting user

router.delete('/users/me',auth, async(req,res)=>{
 

    try {

         req.user.remove()
        // const user = await User.findByIdAndDelete(_id)
        // if(!user){
        //     return res.status(400).send({"error":"Sorry... User not found"})
        // }
        res.status(202).send({user: req.user,message:'User deleted successfully'})
    }catch(e){
        res.status(500).send(e)
    }
})



router.post('/users/login', async (req, res)=> {
    const email = req.body.email
    const password = req.body.password

    try {
        const user = await User.findByCredentials(email, password)
        const token = await user.generateUserToken();
        res.status(302).send({user, token});

    }catch(e) {
     
        res.status(400).send({error: 'User not found'})
    }
})

module.exports = router