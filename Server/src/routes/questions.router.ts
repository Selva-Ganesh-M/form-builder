import express from "express";
import { cQRouter } from "./cQ.router";
import { mcqRouter } from "./mcq.router";
import { mcaRouter } from "./mca.router";
import { stRouter } from "./st.router";

const router = express.Router();

router.use("/categorizeQ", cQRouter);
router.use("/mcq", mcqRouter);
router.use("/mca", mcaRouter);
router.use("/st", stRouter);

export const questionsRouter = router;
