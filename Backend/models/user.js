import mongoose from "mongoose"
import {genSalt, hash} from "bcrypt";


const userSchema = new mongoose.Schema({
  username : {
    type: String,
    required: true,
    unique: true,
  },
  email : {
    type : String,
    required : true,
    unique : true,
  },
  password : {
    type : String,
    required : true,
    minlength : [8 , "Password too short"]
  },

  firstname : {
    type : String,
    required : false,
  },

  lastname : {
    type : String,
    required : false,
  },

  role : {
    type : String,
    enum : ["Student" , "Mentor" , "Explorer"],
    default : "Explorer",
    required : false,
  },

  collegeName : {
    type : String ,
    required : function () {
      return this.role === "Mentor"
    }
  },

  batch : {
    type : Number,
    required : function () {
      return this.role === "Mentor"
    }
  },
  course :{
    type : String ,
    required : function () {
      return this.role === "Mentor"
    }
  },



  description : {
    type : String ,
    required: false,
    default : "Hey there! I am using Homiese :)"
  },


  profileSetup : {
    type : Boolean,
    default : false,
  }
})


userSchema.pre('save' , async function (next) {
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
})

const User  = mongoose.models.User || mongoose.model("User" , userSchema);
export default User;
