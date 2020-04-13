const express = require('express')
const app = express()

const port = process.env.PORT || 3000


app.listen(port, ()=>{
    console.log("Server up and running")
})

app.use((req,res,next)=>{

    res.status(503).send("Site under mentainance mode. Please try again later")

})



require('./db/mongoose.js')



const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)







