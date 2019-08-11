const mongoose = require("mongoose");
const { Schema } = mongoose;

const checklistItemsSchema = new Schema({
  name: String,
  completed: Boolean
});

mongoose.model("checklistItems", checklistItemsSchema);
