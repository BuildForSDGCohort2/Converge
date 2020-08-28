import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { getRepository } from "typeorm";
import User from "../models/userModel";

export async function register(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = req.body;
      const passwordHash = await bcrypt.hash(data.password, 10);
      const user = await getRepository(User).create({
        ...data,
        password: passwordHash
      });
  
      await getRepository(User).save(user);
      user["password"] = undefined;
      if (user) {
        res.status(201).send({ status: 201, message: "Created", user: user });
      }
    } catch (error) {
      next(error);
    }
  }