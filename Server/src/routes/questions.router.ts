import express from "express";
import { cQRouter } from "./cQ.router";

const router = express.Router();

router.use("/categorizeQ", cQRouter);

export const questionsRouter = router;
