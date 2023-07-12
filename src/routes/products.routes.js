import { Router } from "express";
import { changeStock, getProducts, postProduct } from "../controllers/products.controller.js";
import { schemaValidation } from "../middlewares/schemaValidation.middleware.js";
import { postProductSchema } from "../schemas/products.schemas.js";

const productsRouter = Router();

productsRouter.post('/products', schemaValidation(postProductSchema), postProduct);
productsRouter.get('/products', getProducts);
productsRouter.put('/products/:value/:id', changeStock);

export default productsRouter;
