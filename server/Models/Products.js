const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String
    },
    price:{
        type:String
    },
    category:{
        type:String
    },
    userId:{
        type:String
    },
    company:{
        type:String
    }
    
})
const Product = mongoose.model('products' , productSchema)
module.exports = Product