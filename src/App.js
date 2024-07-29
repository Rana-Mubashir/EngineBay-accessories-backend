import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import { CatagoryRouter } from './routes/Catagory.routes.js';
import { productRouter } from './routes/Product.routes.js';

config();

const app=express()

app.use(cors ({
    origin:process.env.CORS_ORIGIN
}))

app.use (express.json({
    limit:"16kb",
}))

app.use('/api/catagory',CatagoryRouter)

app.use('/api/product',productRouter)

export {app}   