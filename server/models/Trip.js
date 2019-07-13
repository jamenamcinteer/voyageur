const mongoose = require("mongoose");
const { Schema } = mongoose;

const tripSchema = new Schema({
  destination: String,
  endDate: Number,
  startDate: Number,
  photo: String,
  photoAttribution: String
});

mongoose.model("trips", tripSchema);
