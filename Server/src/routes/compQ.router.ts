import express from "express";
import { compQCtrl } from "../controllers/compQ.ctrl";

const router = express.Router();

router.get("/:qId", compQCtrl.getOne);
router.post("/create", compQCtrl.create);
router.delete("/delete/:qId", compQCtrl.deleteOne);

export const compQRouter = router;
