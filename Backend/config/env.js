import {config} from "dotenv";

config({path : `./env.${process.env.NODE_ENV || 'development'}.local`});


export const {PORT , ORIGIN, DATABASE_URL,JWT_KEY} = process.env;