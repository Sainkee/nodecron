import mongoose from "mongoose";

const recipientSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: String,
});

const Recipient = mongoose.model('Recipient', recipientSchema);

export default Recipient;