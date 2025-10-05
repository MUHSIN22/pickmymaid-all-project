import express, { Router } from "express";
import { getPaginatedMaidsController } from "../../controllers/v2/maids.controllers";

const router:Router = express.Router();

router.get(`/find/:page`, getPaginatedMaidsController);

export default router;