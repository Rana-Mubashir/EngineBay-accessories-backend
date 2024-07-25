import { NewArrivals } from "../models/NewArrivals.models.js";

async function checkLimit(req,res,next){
    try {
        const id=req.params.id
        if(!id){
            return res.status(400).json({
                message:'Id must be required',
            })
        }

        const isLaunchTrue= await NewArrivals.findById(id);
        if(isLaunchTrue.launch === true){
           return  next();
        }

       const launchLimit= await NewArrivals.countDocuments({launch:true})

       if(launchLimit.length >= 6){
        return res.status(400).json({
            message:'no Limit for launching new arrivals'
        })
       }
        next();


    } catch (error) {
        return res.status(500).json({
            message:'Internal server error',
            error:error.message,
        })
    }
}

export {checkLimit}