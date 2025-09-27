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
                message:"plz check some of the crediantials are missing"
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

export const login =async (req,res)=>{
    const {email ,password} = req.body;

    //can alos implement zod validation
    if(!email || !password){
        res.status(201).json({
                message:"plz check some of the crediantials are missing"
        })
    }
    try {
        const user = await db.user.findUnique({
            where:{
                email
            }
        })

        if(!user){
            return res.status(200).json({
                message:"user not found based on the details provided"
            })
        }

        const isPassowrdCorrect =await bcrypt.compare(password,user.password)

        if(!isPassowrdCorrect){
            return res.status(201).json({
                message:"password don't match"
            })
        }

        //create a sesion 
        const token = jwt.sign({id:user.id},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        )

        res.cookie("jwt",token,{
             httpOnly:true,
                sameSite:"strict",
                secure:process.env.NODE_ENV !== "development",
                maxAge:1000 * 60 * 60 * 24 * 7 // 7 days
        })

        res.status(200).json({
            success:true,
            message:"User loggedin successfully",
            user:{
                id:user.id,
                email:user.email,
                name:user.name,
                role:user.role,
                image:user.image
            }
        })
    } catch (error) {
        console.log("error logging the user",error)
        res.status(200).json({
            message:"error logging the user"
        })
    }
}

export const logout = async(req,res)=>{
    try {
        res.clearCookie("jwt",{
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV !== "development",
        })

        res.status(200).json({
            success:true,
            message:"User logged out successfully"
        })
    } catch (error) {
        console.error("Error logging out user:", error);
        res.status(500).json({
            error:"Error logging out user"
        })
    }
}

export const check = async (req , res)=>{
    try {
        res.status(200).json({
            success:true,
            message:"User authenticated successfully",
            user:req.user //we have already given info in req.user object
        });
    } catch (error) {
        console.error("Error checking user:", error);
        res.status(500).json({
            error:"Error checking user"
        })
    }
}