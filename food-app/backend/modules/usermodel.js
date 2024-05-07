import mongoose from "mongoose"

const userSchema= new mongoose.Schema({
     name:{type:String,require:true},
     email:{type:String,require:true,uniqe:true},
     password:{type:String,require:true},
     cartData:{type:Object,default:{}},
     isAdmin:{type:Boolean,default:false}
},{minimize:false})

const userModel=mongoose.models.user|| mongoose.model("user",userSchema);
export default userModel