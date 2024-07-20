import {connectdb} from './config/db.js'
import { config } from 'dotenv'
import {app} from './App.js'
config();

connectdb()
.then((res)=>{
   app.listen(`${process.env.PORT}`,()=>{
    console.log(`server is listening at port ${process.env.PORT}`)
   })
})
.catch((error)=>{
console.log('error in running server')
})

app.get('/rana',(req,res)=>{
   return res.status(200).json({
      message:'rana mubashir is brand'
   })
})