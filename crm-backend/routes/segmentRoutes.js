import express from "express";
import {
  previewSegment,
  createSegment,
  listSegments,
} from "../controllers/segmentController.js";
const router = express.Router();
router.route("/").get(listSegments).post(createSegment);
router.post("/preview", previewSegment);

export default router;
