const mongoose = require("mongoose");
const { Schema } = mongoose;

const personSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    ip_address: String,
  }, 
   { timestamps: true }
);

module.exports = mongoose.model("Person", personSchema);
