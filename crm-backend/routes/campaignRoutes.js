import express from "express";
import {
  createCampaign,
  listCampaigns,
} from "../controllers/campaignController.js";
const router = express.Router();

router.post("/", createCampaign);
router.get("/", listCampaigns);

export default router;
