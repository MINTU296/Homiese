import {Router} from 'express';
import {getUser, login, signUp} from "../controller/auth.controller.js";
import {verifyUser} from "../middleware/auth.middleware.js";



const authRouter = new Router();

authRouter.post('/login', login);

authRouter.post("/sign-up" , signUp);

authRouter.get("/user-info" , verifyUser , getUser);

export default authRouter;

