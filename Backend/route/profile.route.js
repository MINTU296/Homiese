import {Router} from "express";
import {updateUser} from "../controller/profile.controllor.js";

const profileRouter = Router();

profileRouter.put("/update" , updateUser);


export default profileRouter;
