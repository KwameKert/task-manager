const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URL,{
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

