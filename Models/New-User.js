const mongoose = require("mongoose")

const NewUserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
       } ,
       username:{
        type:String,
        required:true
       } ,
       email:{
        type:String,
        required:true
       } ,
       password:{
        type:String,
        required:true
       } ,
       contact:{
        type:Number,
        required:true
       } ,
       address:{
        type:String,
        required:true
       } 
})
const User = new mongoose.model("user",NewUserSchema)

module.exports = User