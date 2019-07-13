const mongoose = require("mongoose");
const { Schema } = mongoose;

const tripSchema = new Schema({
  destination: String,
  endDate: Number,
  startDate: Number,
  photo: String,
  photoAttribution: String,
  uid: String
});

mongoose.model("trips", tripSchema);
