import { Router } from "express";
import { createCatagory, deleteCatagory, getAllCatagory, updateCatagory } from "../controllers/Catagory.controller.js";

const CatagoryRouter= Router()

CatagoryRouter.post('/create',createCatagory)
CatagoryRouter.put('/update/:id',updateCatagory)
CatagoryRouter.delete('/delete/:id',deleteCatagory)
CatagoryRouter.get('/getAll',getAllCatagory)

export {CatagoryRouter}