import { mcaCtrl } from "./../controllers/mca.ctrl";
import express from "express";

const router = express.Router();

router.get("/:qId", mcaCtrl.getOne);
router.post("/create", mcaCtrl.create);
router.patch("/update/:qId", mcaCtrl.update);

export const mcaRouter = router;
