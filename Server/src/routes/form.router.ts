import express, { Request, Response } from "express";
import { formCtrl } from "../controllers/form.ctrl";

const formRouter = express.Router();

formRouter.get("/", formCtrl.getAllForms);

export default formRouter;
