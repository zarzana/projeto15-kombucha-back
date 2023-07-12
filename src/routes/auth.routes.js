import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";
import { schemaValidation } from "../middlewares/schemaValidation.middleware.js";
import { userAuth } from "../middlewares/userAuth.middleware.js";
import { signInSchema, signUpSchema } from "../schemas/auth.schemas.js";

const authRouter = Router();

authRouter.post('/sign-up', schemaValidation(signUpSchema), signUp);
authRouter.post('/sign-in', schemaValidation(signInSchema), signIn);
authRouter.delete('/sign-out', userAuth, signOut);

export default authRouter;