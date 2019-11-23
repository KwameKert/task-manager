require('../src/db/mongoose');
const User = require('../src/models/User')
const Task  = require('../src/models/Task')


// User.findByIdAndUpdate('5dd55bce9415743d2ce63e0a',{age: 22}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age: 21})
// }).then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })


// const updateAndCount = async (id, age) => {
//     const user = await User.findByIdAndUpdate(id, {age});
//     const count = await User.countDocuments({age})
//     return count ;
// }


// updateAndCount("5dd55bce9415743d2ce63e0a",10).then((count)=>{
//     console.log("updated succesfully", count)
// }).catch((e)=>{
//     console.log("Error", e);
// })




const deleteAndCountTask = async (id) => {
    
    Task.findByIdAndDelete(id)
    const count = Task.countDocuments({completed: false})
    return count;
}



deleteAndCountTask("5dd47d1df99faa338c308253").then((count)=>{
    console.log("The number is ",count)
}).catch((e)=>{
    console.log("Sorry an error occured ",e)
})