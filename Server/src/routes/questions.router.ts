import express from "express";
import { cQRouter } from "./cQ.router";
import { mcqRouter } from "./mcq.router";

const router = express.Router();

router.use("/categorizeQ", cQRouter);
router.use("/mcq", mcqRouter);

export const questionsRouter = router;
