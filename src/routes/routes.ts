import express from "express";
import { Send } from "../controllers/api";

const router = express.Router();

router.get('/send', Send);

export default router;