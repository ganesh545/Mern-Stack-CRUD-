const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const Product = require('../Models/Products');



const SECRET = 'qwertyuioplkjhgfdsazxcvbnmklopijuhygtfdrsewqazxcv'




router.post('/register' , async (req,res)=>{
    try {
        const {name , email , phone , address , password} = req.body
        if(!name || !email || !phone || !address || !password){
           return res.status(400).json({msg:"Please Fill all the Fields"})
        }
        const salt = 10;
        const hash_password = await bcrypt.hash(password , salt)
        const Register = await User.findOne({email})
        if(Register){
           return res.status(400).json({msg:"user already Exist"})
        }
        const Exist = await User.create({name , email , phone , address , password:hash_password})
        if(Exist){
            const token = jwt.sign({_id:User.id},SECRET)
          return res.status(200).json({msg:"Register sucessfully" , token , Exist})
        }
    } catch (error) {
        console.log(error)
    }
})

router.post('/login' , async(req,res)=>{
    try {
        const {email , password} = req.body
        if(!email || !password){
           return res.status(400).json({msg:"Please Fill all the Fields"})
        }
        const Exist = await User.findOne({email})
        if(!Exist){
           return res.status(400).json({msg:"Invalid Username"})
        }
        const Comparepwd = await bcrypt.compare(password , Exist.password)
        if(!Comparepwd){
           return res.status(200).json({msg:"Invalid Password"})
        }
       
        const token =  jwt.sign({_id:User._id},SECRET)
        return res.status(200).json({msg:"Login sucessfull" , token ,Exist})
    } catch (error) {
        console.log(error)
    }
})

router.post('/add',async(req,res)=>{
    try {
    const {name , price , category , userId , company} = req.body

    const Add = await Product.create({name , price , category , userId , company})
    if(Add){
      return  res.status(200).json({msg:"Added Sucessfull" , Add})
    }
    } catch (error) {
        console.log(error)
    }
})

router.get('/get',async(req,res)=>{
    try {
        const Get = await Product.find()
        if(Get.length > 0){
        return res.status(200).send(Get)
        }
    } catch (error) {
        console.log(error)
    }
})

router.delete('/delete/:id',async(req,res)=>{
    try {
        const result = await Product.deleteOne({_id:req.params.id})
        return res.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
})

router.get('/product/:id' , async(req,res)=>{
    try {
        const result = await Product.findOne({_id:req.params.id})
        if(result){
            res.send(result)
        }else{
            res.send("No records found")
        }
    } catch (error) {
        console.log(error)
    }
})

router.put('/product/:id' , async(req,res)=>{
    try {
        const result = await Product.updateOne({_id:req.params.id} , {$set:req.body})
        if(result){
            return res.send(result)
        }
    } catch (error) {
        console.log(error)
    }
})

router.get('/search/:key',async(req,res)=>{
    try {
        const data = await Product.find(
            {"$or":[
                {name : {$regex : req.params.key}},
                {company : {$regex : req.params.key} },
                {price : {$regex : req.params.key}}
            ]}
        )
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;