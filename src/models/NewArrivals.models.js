import { Schema, model } from 'mongoose'
import { Catagory } from './Catagory.models.js'

const newArrivalsSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    catagory: {
        type: Schema.Types.ObjectId,
        ref: Catagory
    },
    stock: {
        type: Number,
        required: true,
    },
    colors: {
        type: [String],
        required: true,
    },
    launch: {
        type: Boolean,
        default: false,
    },
    imagesUrl:{
        type:[String],
        required:true 
    }

})

export const NewArrivals= model('NewArrivals',newArrivalsSchema)