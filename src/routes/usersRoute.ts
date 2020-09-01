import {
    register,
    login,
    getUser,
    getUsers
} from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";
import { Router } from "express";
  
const userRouter = Router();
userRouter.post("/users/register",register);
userRouter.post("/users/login",login);
userRouter.get("/users/:id", authMiddleware, getUser);
userRouter.get("/users", authMiddleware, getUsers);

export { userRouter };
  