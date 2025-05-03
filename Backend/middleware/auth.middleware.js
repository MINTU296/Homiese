import {JWT_KEY} from "../config/env.js";
import jwt from "jsonwebtoken";

export const verifyUser = (req , res , next) => {


    const token = req.cookies.jwt;
    if(!token){
        return res.status(401).send({"message" : "You are not authorized"});
    }
    jwt.verify(token , JWT_KEY, (err, payload) => {
        if(err){
            return res.status(403).send({"message" : "Token is invalid"});
        }
        req.userID = payload.userID;
        next();
    })

}

