import mongoose from 'mongoose'
import "dotenv/config";

export const connectDB= async ()=>{
     await mongoose.connect(process.env.STRING_DB+'food-Del').then(()=>console.log("DB connected"))
}