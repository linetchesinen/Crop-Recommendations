// models/Contact.js
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    message: String
  },
  { timestamps: true } // IMPORTANT
);

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;