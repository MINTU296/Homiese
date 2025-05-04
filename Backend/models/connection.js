import mongoose from "mongoose";

const connectionSchema = mongoose.Schema({
    mentor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    mentee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

connectionSchema.index({ mentor_id: 1, mentee_id: 1 }, { unique: true });
const Connection = mongoose.models.connections || mongoose.model("Connections" , connectionSchema);
export default Connection;
