import { Schema,model } from "mongoose";

const productSchema=new Schema({

    name:{
        type:String,
        unique:true,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    stock:{
        type:Number,
        required:true,
    },
    colors:{
        type:Array
    },
    launch:{
        type:Boolean,
        default:true,
    },
    category:{
        
    },
    subCategory:{

    },
    imageUrl:{
        type:Array,
        // required:true
    },

    // from here offer schema starts

    offerPrice:{
        type:Number,
        default:0,
    },
    offerEndDate:{
        type:Date,
        
    },
    isOffer:{
        type:Boolean,
        default:false,
    },
})

export const Product=model("Product",productSchema)