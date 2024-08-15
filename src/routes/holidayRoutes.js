import express from "express";
import { getHolidays } from "../controllers/holidayController.js";

const router = express.Router();

router.get("/holidays", getHolidays);

export default router;
