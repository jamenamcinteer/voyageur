const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const BudgetCategory = mongoose.model("budgetCategories");

module.exports = app => {
  // PRIVATE
  app.get("/api/budgetCategories", requireLogin, (req, res) => {
    BudgetCategory.find({ uid: req.user._id }, function(err, data) {
      res.send(data);
    });
  });

  app.post("/api/budgetCategories", requireLogin, async (req, res) => {
    let update = new BudgetCategory({
      uid: req.user._id,
      ...req.body
    });
    try {
      const data = await update.save();
      res.send(data);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.put("/api/budgetCategories/:id", requireLogin, (req, res) => {
    let update = new BudgetCategory({
      _id: req.params.id,
      uid: req.user._id,
      ...req.body
    });
    update.isNew = false;
    update.save(err => {
      if (err) res.send(err);
      else {
        res.send({ message: "ok" });
      }
    });
  });

  app.delete("/api/budgetCategories/:id", requireLogin, (req, res) => {
    BudgetCategory.findOneAndDelete(
      { _id: req.params.id, uid: req.user._id },
      req.body,
      (err, data) => {
        if (!err) {
          res.send({ message: "deleted" });
        } else {
          res.send(err);
        }
      }
    );
  });
};
