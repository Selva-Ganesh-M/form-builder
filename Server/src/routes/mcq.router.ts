import express from "express";
import { mcqCtrl } from "../controllers/mcq.ctrl";

const router = express.Router();

router.get("/:qId", mcqCtrl.getOne);
router.post("/create", mcqCtrl.create);
router.patch("/update/:qId", mcqCtrl.update);

export const mcqRouter = router;
