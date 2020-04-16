const express = require('express')
const router = new express.Router()
const auth = require('../middlewares/auth')
const Task = require('../models/Task')

router.post('/tasks',auth,async (req,res)=>{
    // console.log(req.body);
     const task = new Task({ 
         ...req.body,
         owner: req.user._id
     });
 
     try {
          task.save()
         res.status(201).send(task)
     }catch(e){
         res.status(500).send(e)
     }
    
 })
 
 router.get('/tasks', auth, async (req,res)=>{
     try {
         const tasks = await Task.find({owner: req.user._id})

         res.send(tasks)
     }catch(e){
         res.status(500).send(e)
     } 
 })
 


 router.get('/tasks/:id',auth, async (req,res)=>{
     const _id = req.params.id

     try {
         const task = await  Task.findOne({_id, owner:req.user._id})


         if(!task){
             return res.status(400).send({error: "Task does not exist"})
         }      
         res.status(200).send(task)
     }catch(e){
       
         res.status(500).send(e)
     }
 })
 
 
 router.patch('/tasks/:id',async (req,res)=>{
     const _id = req.params.id
     const updates = Object.keys(req.body)
     const allowedParams = ['description','completed']
     const isValid = updates.every((update)=> allowedParams.includes(update))
 
     if(!isValid){
         return res.status(401).send({"error":"Invalid parameters"})
     }
     try{

        const task = await Task.findById(_id)

        updates.forEach(update=> task[update] = req.body[update]);

         res.send(task)
     }catch(e){
         console.log(e)
         res.status(500).send(e)
     }
 })
 
 
 router.delete('/tasks/:id', async (req,res)=>{
     const _id = req.params.id
 
     try{
         const task =await  Task.findByIdAndDelete(_id)
         if(!task){
             res.status(400).send({"error":"Task not found"})
         }
         res.status(202).send(task)
     }catch(e){
         res.status(500).send(e)
     }
 })

 
 
module.exports = router