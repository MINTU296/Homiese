import {Router} from "express";
import {addConnection, getAllConnections, getChat, updateChat} from "../controller/chat.controllor.js";

const chatRouter = new Router();

chatRouter.post("/add-connection" , addConnection);
chatRouter.post("/get-all-connections" , getAllConnections);
chatRouter.post("/get-chat" , getChat);
chatRouter.post("/update-chat" , updateChat);
export default chatRouter
