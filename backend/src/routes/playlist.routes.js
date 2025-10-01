import express from "express"
import { createPlaylist, getAllPlaylistDetails } from "../controllers/playlist.controller.js";
import { authMiddleware } from "../midlewares/auth.middleware.js";

export const playlistRouter = express.Router();


playlistRouter.post("/create-playlist",authMiddleware,createPlaylist)
playlistRouter.get("/get-all-playlist",authMiddleware,getAllPlaylistDetails)

