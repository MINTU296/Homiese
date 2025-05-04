import {Router} from 'express';
import {getDetails, getUserDetails} from "../controller/details.controllor.js";

const detailsRouter = new Router();

detailsRouter.post("/getDetail"  , getDetails)
detailsRouter.post("/get-user-details" , getUserDetails)
export default detailsRouter
