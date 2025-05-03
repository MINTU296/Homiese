const mongoose=require("mongoose")


const messageModel=mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    receiver:{
        type: mongoose.Schema.Types.ObjectId,
        type:"User"
    },
    chat:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Chat"

    }
},
{
    timeStamp: true,
});
const Message=mongoose.mongo.MongoDBCollectionNamespace("Message",messageModel);
module.exports=Message;
