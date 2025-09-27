import { db } from "../libs/db.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { UserRole } from "../generated/prisma/index.js";


export const register = async (req, res) => {
    //get the data from request body
    //check if there any existing user
    //craete a hashed passowrd using bcrypt hash
    //create a new user
    //craate a cookie
    //send the response 
    const { email ,password , name }= req.body  //important to put same name used in teh database models
    console.log("hitting the route?",req.body)

    try {
        
        if(!email || !password || !name){
            return res.status(400).json({
                message:"plz check some of teh crediantials are missing"
            })
        }
    
        const existingUser = await db.user.findUnique({
            where:{
                email
            }
        })
    
    
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already existing with this crediantials"
            })
        }
    
        const hashedPassword = await bcrypt.hash(password,10) //10 defines the salt value
    
    
        const newUser = await db.user.create({
            data:{
                email,
                password:hashedPassword,
                name,
                role:UserRole.USER
            }
        })
    
        const token = jwt.sign(
            {id:newUser.id},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
            
        )
    
        //now go to index.js file and initialize cookieparser
    
        res.cookie("jwt",token,{
             httpOnly:true,
                sameSite:"strict",
                secure:process.env.NODE_ENV !== "development",
                maxAge:1000 * 60 * 60 * 24 * 7 // 7 days
        })
    
        res.status(201).json({
            id:newUser.id,
            name:newUser.name,
            email:newUser.email,
            role:newUser.role,
            image:newUser.image  //not handled yet this is for future purposes
        })
    } catch (error) {
        console.error("error hai bhai in registering",error)
        return res.status(200).json({
            message:"error registering user"
        })
    }

}