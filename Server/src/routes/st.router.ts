import express from "express";
import { stCtrl } from "../controllers/st.ctrl";

const router = express.Router();

router.get("/:qId", stCtrl.getOne);
router.delete("/delete/:qId", stCtrl.deleteOne);
router.patch("/update/:qId", stCtrl.update);
router.post("/create", stCtrl.create);

export const stRouter = router;
