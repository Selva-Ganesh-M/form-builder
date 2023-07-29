import express from "express";
import { cQRouter } from "./cQ.router";
import { mcqRouter } from "./mcq.router";
import { mcaRouter } from "./mca.router";

const router = express.Router();

router.use("/categorizeQ", cQRouter);
router.use("/mcq", mcqRouter);
router.use("/mca", mcaRouter);

export const questionsRouter = router;
