import Connection from "../models/connection.js";
import Chat from "../models/chat.js";

export const addConnection = async (req, res) => {
    try{
        const { mentor_id , mentee_id } = req.body;
        const result = await Connection.find(
            {
                mentor_id: mentor_id,
                mentee_id: mentee_id,
            }
        )
        if(result.length !== 0){
            return res.status(201).send({
                message: "They already exists"
            })
        }

        const newEntry = await Connection.create({
            mentor_id: mentor_id,
            mentee_id: mentee_id,
        })

        return res.status(201).send({
            message : "Connections Established",
        })
    }
    catch(err){
        console.log(err);
    }
}

export const getAllConnections = async (req, res) => {
    try{
        const {mentee_id} = req.body;
        const result = await Connection.find({
            mentee_id: mentee_id,
        })

        return res.status(200).send({
          "Connections" : result
        })

    }catch (e) {
        console.log(e)
    }
}

export const updateChat = async (req, res) => {
    try {
        const { sender_id, receiver_id, message } = req.body;

        const response = await Chat.create({
            sender: sender_id,
            receiver: receiver_id,
            message,
        });

        const result = await Connection.find(
            {
                mentor_id: sender_id,
                mentee_id: receiver_id,
            }
        )

        console.log(result)
        if (result.length === 0) {
            await Connection.create({
                mentor_id: sender_id,
                mentee_id: receiver_id,
            });
        }

        return res.status(201).send({ success: true, message: "Message sent.", data: response });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ success: false, message: "Server Error" });
    }
};

export const getChat = async (req, res) => {
    try {
        const { sender_id, receiver_id } = req.body;

        const messages = await Chat.find({
            $or: [
                { sender: sender_id, receiver: receiver_id },
                { sender: receiver_id, receiver: sender_id },
            ],
        }).sort({ createdAt: 1 });

        return res.status(200).send({ success: true, data: messages });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ success: false, message: "Server Error" });
    }
};

