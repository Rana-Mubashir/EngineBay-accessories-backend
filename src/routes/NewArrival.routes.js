import { Router } from "express";
import { create, deleteNewArrival, getAllNewArrivals, launchNewArrival, update } from "../controllers/NewArrivals.controller.js";
import { checkLimit } from "../middlewares/CheckNewArrivalLaunchLimit.js";

const newArrivalRouter=Router();

newArrivalRouter.post('/create',create)
newArrivalRouter.delete('/delete/:id',deleteNewArrival)
newArrivalRouter.get('/getAll',getAllNewArrivals)
newArrivalRouter.put('/launch/:id',checkLimit,launchNewArrival)
newArrivalRouter.put('/update/:id',update)

export {newArrivalRouter}