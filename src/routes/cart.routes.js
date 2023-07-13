import { Router } from "express";
import { schemaValidation } from "../middlewares/schemaValidation.middleware.js";
import { cartSchema, cartUserSchema } from "../schemas/cart.schemas.js";
import { getCart, postCart } from "../controllers/cart.controller.js";
import { userAuth } from "../middlewares/userAuth.middleware.js";

const CartRouter = Router()

CartRouter.post("/cart",userAuth,schemaValidation(cartSchema),postCart)
CartRouter.get("/cart",userAuth,getCart)

export default CartRouter