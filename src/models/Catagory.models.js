
import { Schema,model } from "mongoose";

const catagorySchema=new Schema({

    name:{
        type:String,
        required:true,
        unique:true,
    },

    imageUrl:{
        type:String,
        required:true,
    }

})

export const Catagory=model("Catagory",catagorySchema)