import { db } from "../libs/db.js"


export const createPlaylist =async(req,res)=>{
    //get name and description from req.body
    //userId from params
    //create a playlist 

    const {name ,  description }=req.body
    const userId = req.user.id

    if(!name || !description){
        return res.status(200).json({
            message:"Plz give all the required credentials"
        })
    }
    try {
        const playlist = await db.playlist.create({
            name,
            description,
            userId
        })


        return res.status(200).json({
            message:"succesfully created the playlist",
            playlist
        })
    } catch (error) {
      return res.status(400).json({
        message:"error creating the playlist"
      })
    }

}