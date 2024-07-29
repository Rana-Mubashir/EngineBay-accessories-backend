import { Router } from "express";
import { applyOffer, closeOffer, createProduct, deleteProduct, getAllNewArrivals, getAllOffers, getAllProducts, updateOffer } from "../controllers/Product.controller.js";

const productRouter = Router();

productRouter.post('/create',createProduct)
productRouter.put('/applyOffer/:id',applyOffer)
productRouter.delete('/delete/:id',deleteProduct)
productRouter.put('/closeOffer/:id',closeOffer)
productRouter.get('/getAllOffers',getAllOffers)
productRouter.put('/updateOffer/:id',updateOffer)
productRouter.get('/getNewArrivals',getAllNewArrivals)
productRouter.get('/getAllProducts',getAllProducts)

export { productRouter }