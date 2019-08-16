const mongoose = require("mongoose");
const { Schema } = mongoose;
const ChecklistItemsSchema = require("./ChecklistItem");

const checklistSchema = new Schema({
  tripId: String,
  uid: String,
  name: String,
  type: String,
  hideCompleted: Boolean,
  collapsed: Boolean,
  items: [ChecklistItemsSchema]
});

mongoose.model("checklists", checklistSchema);
