const mongoose = require("mongoose");
const { Schema } = mongoose;

const budgetCategorySchema = new Schema({
  tripId: String,
  budgetCategory: String,
  notes: String,
  uid: String
});

mongoose.model("budgetCategories", budgetCategorySchema);
