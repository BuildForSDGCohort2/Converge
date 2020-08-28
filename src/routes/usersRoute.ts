import {register} from "../controllers/userController";
import { Router } from "express";
  
const userRouter = Router();
userRouter.post("/users/register",register);

export { userRouter };
  