import {config} from "dotenv";

config({path : `./env.${process.env.NODE_ENV || 'development'}.local`});


export const {NEXT_PUBLIC_SERVER_URL} = process.env
