import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    sender : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiver : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message : {
        type: String,
    },
}, {
    timestamps: { createdAt: true, updatedAt: false }
})

const Chat = mongoose.models.chat || mongoose.model("Chat", chatSchema);
export default Chat
