import { Router } from "express";
import authRouter from "./auth.routes.js";
import productsRouter from "./products.routes.js";

const indexRouter = Router();

indexRouter.use(authRouter, productsRouter);

export default indexRouter;
