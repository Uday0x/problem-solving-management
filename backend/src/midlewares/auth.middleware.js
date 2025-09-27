//extract the token from req.cookies
//check if teh tken is not -present
//verify it using try and catch (jwt.verify)
//find user based on the id

import { db } from "../libs/db.js";
import jwt from "jsonwebtoken"

export const authMiddleware = async(req,res,next)=>{
    //need to add next sonce it is a middleware
try {
    
        const token = req.cookies.jwt; //jwt since we are giving the name jwt
    
        //checking
        if(!token){
            res.status(200).json({
                message:"no valid token found"
            })
        }
        console.log("checked token?")
        let decoded;
    
        try {
            //verify whether teh token id right or not 
            decoded = jwt.verify(token,process.env.JWT_SECRET)
        } catch (error) {
            return res.status.json({
                message:"unauthorized token"
            })
        }
    
        //find the user 
    
        const user = await db.user.findUnique({
            where:{
                id:decoded.id
            },
            select:{
                id:true,
                image:true,
                name:true,
                email:true,
                role:true
            }
        })
        console.log("finished user")
        if(!user){
            return res.status(404).json({
                message:"user not found"
            })
        }
    
        req.user=user;
        next() //important
} catch (error) {
    console.error("Error authenticating user:", error);
        res.status(500).json({message:"Error authenticating user"});
}
}

export const checkAdmin = async(req,res,next)=>{
    try {
        const userId = req.user.id; //u can get teh id here coz u put them in the object

        //find the user based on the id
        const user = await db.user.findUnique({
            where:{
                id:userId
            },
            select:{
                role:true
            }
        })


        if(!user || !user.role == ADMIN){
            return res.status(403).json({
                message:"Access denied only admins allowed"
            })
        }

        next() //important may face errors due to this
    } catch (error) {
        console.error("error checking the role ",error)
        res.status(500).json({
            message:"error checking the role"
        })        
    }
}