import { Request, Response, NextFunction } from "express";
const config = require("../utils/config");
import bcrypt from "bcrypt";
import { getRepository } from "typeorm";
import User from "../models/userModel";
import UserInterface from "../interfaces/userInterface"
import jwt from "jsonwebtoken";
import DataStoredInToken from "../interfaces/DataStoredInTokenInterface"
import TokenData from "../interfaces/TokenDataInterface";

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

export async function login (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await getRepository(User).findOne({ email: req.body.email});

    if(user) {
      if (await bcrypt.compare(req.body.password, user.password)){
        const tokenData = createToken(user);
        createCookie(res, tokenData);
        res
          .status(200)
          .send({ status: 200, message: "OK", token: tokenData.token });
      }
    }
  } catch (error) {
    next(error);
  }
 }

 export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const user = await getRepository(User).findOne(id);
    res.status(200).send({ status: 200, message: "OK", user: user });
  } catch (error) {
    next(error);
  }
}

export async function getUsers(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await getRepository(User).find();
    res.status(200).send({ status: 200, message: "OK", users: users });
  } catch (error) {
    next(error);
  }
}

function createToken(user: UserInterface): TokenData {
  const expiresIn = 60 * 60;
  const secret = config.SECRET_KEY;
  const dataStoredInToken: DataStoredInToken = {
    email: user.email
  };
  return {
    expiresIn,
    token: jwt.sign(dataStoredInToken, secret, { expiresIn })
  };
}
function createCookie(res, data: TokenData) {
  return res.cookie("token", data.token, {
    expiresOn: new Date(Date.now() + data.expiresIn),
    secure: false,
    httpOnly: true
  });
}
