import express from "express";

import {verifyToken} from "../utils/verifyToken.js";
import uploadFile from "../utils/uploadFile.js";
import { addBook, getBooks } from "../controllers/Books.js";
const router = express.Router();
router.get("/",getBooks);
router.post("/addBooks/:id",verifyToken,uploadFile.single('file'),addBook);
export default router;