import express from "express";
import { orders, verify } from "../controllers/payment.js";
const router = express.Router();

router.post("/orders", orders);
router.post("/verify", verify);

export default router;
