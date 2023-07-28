import express, { Request, Response } from "express";
import { formCtrl } from "../controllers/form.ctrl";

const formRouter = express.Router();

formRouter.get("/", formCtrl.getAllForms);
formRouter.get("/:formId", formCtrl.getSingleForm);

formRouter.post("/create", formCtrl.createForm);

formRouter.delete("/delete/:formId", formCtrl.deleteForm);

export default formRouter;
