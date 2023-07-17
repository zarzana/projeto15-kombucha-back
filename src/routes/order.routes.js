import { Router } from "express";
import { userAuth } from "../middlewares/userAuth.middleware.js";
import { schemaValidation } from "../middlewares/schemaValidation.middleware.js";
import { orderSchema } from "../schemas/order.schemas.js";
import { postOrder } from "../controllers/order.controller.js";

const orderRouter = Router()

orderRouter.post("/order",userAuth,schemaValidation(orderSchema),postOrder)

export default orderRouter