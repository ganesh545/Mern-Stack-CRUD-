const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const jwtkey = 'e-com';

const PORT = 8080;
const app = express()
app.use(cors())
app.use(express.json())


app.get("/get" ,require('./Routers/Router'))
app.post('/add' , require('./Routers/Router'))
app.post('/register',require('./Routers/Router'))
app.post('/login' , require('./Routers/Router'))
app.delete('/delete/:id',require('./Routers/Router'))
app.get('/product/:id' , require('./Routers/Router'))
app.put('/product/:id' , require('./Routers/Router'))
app.get('/search/:key',require('./Routers/Router'))





mongoose.connect('mongodb+srv://Ganesh:Ganesh@cluster0.b4ppmj1.mongodb.net/apple').then(()=>{
    console.log("Connection Db sucessfull")
}).catch(()=>{console.log("Database connection failed")})
app.listen(PORT,()=>{
    console.log("Server is running on post no" ,PORT)
})