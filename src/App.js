import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import { CatagoryRouter } from './routes/Catagory.routes.js';
import { newArrivalRouter } from './routes/NewArrival.routes.js';
config();

const app=express()

app.use(cors ({
    origin:process.env.CORS_ORIGIN
}))

app.use (express.json({
    limit:"16kb",
}))

app.use('/api/catagory',CatagoryRouter)

app.use('/api/newArrival',newArrivalRouter);

export {app}   