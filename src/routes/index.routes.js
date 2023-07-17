import { Router } from "express";
import authRouter from "./auth.routes.js";
import productsRouter from "./products.routes.js";
import CartRouter from "./cart.routes.js";
import orderRouter from "./order.routes.js";

const indexRouter = Router();

indexRouter.use(authRouter, productsRouter, CartRouter, orderRouter);

export default indexRouter;
