import express from "express";
import { register, login, getUser, toggleBuyer } from "../controllers/Auth.js";
import {verifyToken} from "../utils/verifyToken.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/:id",verifyToken,getUser);
router.put("/:id",verifyToken,toggleBuyer);
export default router;