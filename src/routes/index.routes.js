import { Router } from "express";
import authRouter from "./auth.routes.js";
import productsRouter from "./products.routes.js";
import CartRouter from "./cart.routes.js";

const indexRouter = Router();

indexRouter.use(authRouter, productsRouter, CartRouter);

export default indexRouter;
