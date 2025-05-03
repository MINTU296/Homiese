import {DATABASE_URL} from "../config/env.js";
import mongoose from "mongoose";

if(!DATABASE_URL){
    console.error("Database Connection url is missing!");
}

const connectToDatabase = async () =>{
    try{
        await mongoose.connect(DATABASE_URL);
        console.log(`MongoDB connected successfully , Database url is ${DATABASE_URL}`);
    }
    catch(err){
        console.error(err);
        process.exit(1);
    }
}

export default connectToDatabase;