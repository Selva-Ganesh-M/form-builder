import express from "express";
import { cQCtrl } from "../controllers/categorizeQ.ctrl";
const router = express.Router();

router.get("/", cQCtrl.get);

export const cQRouter = router;
