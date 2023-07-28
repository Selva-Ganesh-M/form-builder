import express from "express";
import { cQCtrl } from "../controllers/categorizeQ.ctrl";
import { cQRouter } from "./cQ.router";

const router = express.Router();

router.use("/categorizeQ", cQRouter);

export const questionsRouter = router;
