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

export const getAllPlaylistDetails = async(req,res)=>{
    try {
        const playlists = await db.findMany({
    where:{
         id:req.user.id
    },
    include:{
        problems:{
            include:{
                problem:true
            }
        }
    }
    },
    )

    res.status(200).json({
        success:true,
        message:"playlist fethed succesfully",
        playlists
    })
    } catch (error) {
        console.error("Error fetching the playlists",error)
        res.status(500).json({
            error:"failed to fecth teh playlist"
        })
    }
}

export const getPlaylistDetails = async(req,res)=>{
    const {playlistId} = req.params


    try {
        const playlist = await db.playlist.findUnique({
            where:{
                id:playlistId,
                userId:req.user.id
            },
            include:{
                problems:{
                    include:{
                        problem:true
                    }
                }
            }
        })

        return res.status(200).json({
            message:"fetched the data succesfully",
            playlist
        })
    } catch (error) {
        console.log("error in fetching teh details",error);
        

        return res.status(500).json({
            message:"error in fetching the details"
        })
    }
}