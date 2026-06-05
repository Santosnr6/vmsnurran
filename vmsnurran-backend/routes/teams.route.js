import { Router } from "express";
import {
    getTeamsController,
    getTeamByCodeController,
} from "../controllers/teams.controller.js";

const router = Router();

router.get("/", getTeamsController);
router.get("/:code", getTeamByCodeController);

export default router;