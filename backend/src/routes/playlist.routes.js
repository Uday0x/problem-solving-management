import express from "express"
import { addProblemtoPlaylist, createPlaylist, deletePlaylist, getAllPlaylistDetails, getPlaylistDetails } from "../controllers/playlist.controller.js";
import { authMiddleware } from "../midlewares/auth.middleware.js";

export const playlistRouter = express.Router();


playlistRouter.post("/create-playlist",authMiddleware,createPlaylist)

playlistRouter.get("/get-all-playlist",authMiddleware,getAllPlaylistDetails)

playlistRouter.get("/getPlaylistDetails",authMiddleware,getPlaylistDetails)

playlistRouter.post("/:playlistId/add-problem",authMiddleware,addProblemtoPlaylist)

playlistRouter.delete("/:playlistId",authMiddleware,deletePlaylist)

