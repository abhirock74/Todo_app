const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    img_url:{
        type:String,
        require:true,
        default:""
    },
    gender:{
        type:String,
        require: true
    },
    phone:{
        type:Number,
        default:null
    },
    address:{
        type:String,
        default:""
    }
});

const User = mongoose.model('user', userSchema)

module.exports = User