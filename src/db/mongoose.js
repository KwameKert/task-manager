const mongoose = require('mongoose')
const validator = require('validator')

const connectionUrl = 'mongodb://127.0.0.1/task-manager-api';


mongoose.connect(connectionUrl,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (error, client) =>{{

    if(error){
        return console.log('unable to connect to database')
    }

    console.log("Connected correctly")
}})

