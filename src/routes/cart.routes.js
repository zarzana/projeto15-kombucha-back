import { Router } from "express";
import { getCart, postCart, postManyCart } from "../controllers/cart.controller.js";
import { schemaValidation } from "../middlewares/schemaValidation.middleware.js";
import { userAuth } from "../middlewares/userAuth.middleware.js";
import { cartSchema, cartUserSchema } from "../schemas/cart.schemas.js";

const CartRouter = Router()

CartRouter.post("/cart/:id",userAuth,postCart)
CartRouter.get("/cart",userAuth,getCart)
CartRouter.post("/cart",userAuth,schemaValidation(cartSchema),postManyCart)

export default CartRouter