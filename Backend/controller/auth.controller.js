import User from "../models/user.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import {JWT_KEY} from "../config/env.js";
import {compare} from "bcrypt";

/*
   404 => failed transaction mostly database table error but not sure
   202 => user picked incorrect option
   201 => successful operation

 */

/*
    created basic utility for the working app in the initial phase but model will be changed as we progress
 */


const maxAge = 3 * 24 * 60 * 60 * 1000 ;

const generateToken = async (email , userID) => {
    return await jwt.sign({email, userID}, JWT_KEY, {expiresIn: maxAge});
};

export const signUp = async (req, res) => {
    try{
        const {username ,firstname , lastname , email , password } = req.body;
        if(!username || !email || !password){
            return res.status(400).send({
                "message" : "Username , email and password are required",
            })
        }

        const user = await User.create({
            username : username, email : email, password: password ,
            firstname : firstname,
            lastname : lastname,
        });
        if(!user){
            return res.status(400).send({
                "message" : "Username or email already exists",
            })
        }

        const token = await generateToken(email , user.id);
        res.cookie("jwt" , token , {
            maxAge: maxAge,
            sameSite: "None",
            secure: true,
        });

        return res.status(201).send({
            user : {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
            }})

    }catch(err){
        console.log(err);
        return res.status(500).send({
            "message" : "database connection failed",
        })
    }
}

export const login = async (req ,res) => {
    try{
        const { email , password } = req.body;
        if( !email || !password){
            return res.status(400).send({
                "message" : "Username , email and password are required",
            })
        }

        const user = await User.findOne({email : email});
        const auth = await compare(password, user.password);
        if(!user || !auth){
            return res.status(400).send({
                "message" : "email or password is incorrect",
            })
        }

        const token = await generateToken(email , user.id);
        console.log("Sending Cookie");

        res.cookie("jwt" , token , {
            maxAge: maxAge,
            secure : true ,
            sameSite : "None",
        });

        console.log(res);

        return res.status(201).send({
            user : {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
            }})

    }catch(err){
        console.log(err);
        return res.status(500).send({
            "message" : "database connection failed",
        })
    }

}

export const getUser = async (req , res ) =>{
    try{

        const user = await User.findById(req.userID);
        return res.status(201).send({
            user : {
                id: req.userID,
                email: user.email,
                username : user.username,
                profileSetup: user.profileSetup,
                firstname : user.firstname,
                lastname : user.lastname,
                batch : user.batch,
                course : user.course,
                description : user.description,
                collegeName : user.collegeName,
                role : user.role,
                image : user.image,
                color : user.color,
            }}
        )
    }
    catch(err){
        console.log("Error: ", err);
        return res.status(500).send({
            "message" : err.message
        })
    }
}
