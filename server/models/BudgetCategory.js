const mongoose = require("mongoose");
const { Schema } = mongoose;

const budgetCategorySchema = new Schema({
  tripId: String,
  budgetCategory: String,
  notes: String
});

mongoose.model("budgetCategories", budgetCategorySchema);
