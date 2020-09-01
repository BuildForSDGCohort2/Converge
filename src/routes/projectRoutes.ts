import {getProjects} from "../controllers/projectController";
import { Router } from "express";

const projectRouter = Router();
projectRouter.get("/explore",getProjects);
