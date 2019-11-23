const express = require('express')
const router = new express.Router()
const Task = require('../models/Task')

router.post('/tasks',async (req,res)=>{
    // console.log(req.body);
     const task = new Task(req.body)
 
     try {
         await task.save()
         res.status(201).send(task)
     }catch(e){
         res.status(500).send(e)
     }
    
 })
 
 router.get('/tasks',async (req,res)=>{
     try {
         const tasks = await Task.find({})
         res.send(tasks)
     }catch(e){
         res.status(500).send(e)
     } 
 })
 
 router.get('/tasks/:id',async (req,res)=>{
     const _id = req.params.id
     try {
         const task = await Task.findById(_id)
         if(!task){
             return res.status(404).send("Task does not exist")
         }
         res.send(task)
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
         const task = await Task.findByIdAndUpdate(_id,req.body,{new: true, runValidators: true})
         res.send(task)
     }catch(e){
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