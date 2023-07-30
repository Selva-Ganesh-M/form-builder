import express from "express";
import { cQRouter } from "./cQ.router";
import { mcqRouter } from "./mcq.router";
import { mcaRouter } from "./mca.router";
import { stRouter } from "./st.router";
import { compQRouter } from "./compQ.router";

const router = express.Router();

router.use("/categorizeQ", cQRouter);
router.use("/mcq", mcqRouter);
router.use("/mca", mcaRouter);
router.use("/st", stRouter);
router.use("/compQ", compQRouter);

export const questionsRouter = router;
