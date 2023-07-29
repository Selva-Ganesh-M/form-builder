import express from "express";
import { cQCtrl } from "../controllers/categorizeQ.ctrl";
const router = express.Router();

router.get("/", cQCtrl.get);
router.post("/create", cQCtrl.create);
router.delete("/delete", cQCtrl.deleteOne);
router.patch("/update/:qId", cQCtrl.update);

export const cQRouter = router;
