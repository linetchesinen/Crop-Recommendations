import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  name: String,
  email: String,
  password: String,

  role: {
    type: String,
    enum: ["farmer", "admin"],
    default: "farmer"
  }

});

export default mongoose.model("User", userSchema);