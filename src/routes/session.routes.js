import { Router } from "express";
import {
  createSession,
  getSession,
} from "../controllers/session.controller.js";

const router = new Router();

router.route("/new-session").post(createSession);
router.route("/sessions/:sessionId").get(getSession);

export default router;
