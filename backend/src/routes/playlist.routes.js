import express from "express"
import { createPlaylist } from "../controllers/playlist.controller.js";
import { authMiddleware } from "../midlewares/auth.middleware.js";

export const playlistRouter = express.Router();


playlistRouter.post("/create-playlist",authMiddleware,createPlaylist)


