import {
    register,
    login,
    getUser,
} from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";
import { Router } from "express";
  
const userRouter = Router();
userRouter.post("/users/register",register);
userRouter.post("/users/login",login);
userRouter.get("/users/:id", authMiddleware, getUser);

export { userRouter };
  