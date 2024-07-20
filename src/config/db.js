import mongoose from "mongoose";
import dotenv from 'dotenv'
import { config } from "dotenv";


config();

async function connectdb(){
    try {
        const connect=await mongoose.connect(`${process.env.MONGODB_URI}`)
        if(connect){
            console.log("database connected ");
        }
    } catch (error) {
        console.log('error in database connection',error);
        
    }
}
export {connectdb}