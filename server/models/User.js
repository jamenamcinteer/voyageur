const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    displayName: String,
    email: String,
    photoURL: String
  },
  { strict: false }
);

mongoose.model("users", userSchema);
