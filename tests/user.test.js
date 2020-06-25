const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');

console.log(process.env.PORT)
const userOne = {
    name: 'Kwame',
    email: 'kwame@gmail.com',
    password: 'kwame12345'
}

beforeEach(async()=>{
    const newUser =  await new User(userOne);
    newUser.save();
});


test("Create new user", async()=>{
    await request(app).post('/users').send({
        name: 'Tom',
        email: 'tom@gmail.com',
        password: 'tom1234'
    }).expect(201);
});


test("Invalid password for registration", async()=>{
    await request(app).post("/users").send({
        name: 'kwasi',
        email: 'kwasi@gmail.com',
        password: 'password'
    }).expect(400)
})