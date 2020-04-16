const express = require('express')
require('./db/mongoose.js')

const app = express()

const port = process.env.PORT || 3000


app.listen(port, ()=>{
    console.log("Server up and running")
})

// app.use((req,res,next)=>{

//     res.status(503).send("Site under mentainance mode. Please try again later")

// })

const Task = require('./models/Task');
const User = require('./models/User')

const main = async() =>{

    const user = await User.findById('5e987f72964e55e1034c79db');

    await user.populate('tasks').execPopulate()

    console.log(user.tasks)

    // const task = await Task.findById('5e9888c1aef46be6a688f96c');

    // await task.populate('owner').execPopulate()
    // const owner = task.owner
    // console.log(owner)
}


main()



const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)







