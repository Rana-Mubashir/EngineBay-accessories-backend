import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'

config();

const app=express()

app.use(cors ({
    origin:process.env.CORS_ORIGIN
}))

app.use (express.json({
    limit:"16kb",
}))

export {app}