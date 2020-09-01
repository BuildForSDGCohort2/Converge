import {register} from "../controllers/userController";
import {login} from "../controllers/userController";
import { Router } from "express";
  
const userRouter = Router();
userRouter.post("/users/register",register);
userRouter.post("/users/login",login);

export { userRouter };
  