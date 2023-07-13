import { Router } from "express";
import { getCart, postCart } from "../controllers/cart.controller.js";
import { schemaValidation } from "../middlewares/schemaValidation.middleware.js";
import { userAuth } from "../middlewares/userAuth.middleware.js";
import { cartSchema, cartUserSchema } from "../schemas/cart.schemas.js";

const CartRouter = Router()

CartRouter.post("/cart/:id",userAuth,/* schemaValidation(cartSchema), */postCart)
CartRouter.get("/cart",userAuth,getCart)

export default CartRouter