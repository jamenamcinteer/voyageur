const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const BudgetItem = mongoose.model("budgetItems");

module.exports = app => {
  // PRIVATE
  app.get("/api/budgetItems", requireLogin, (req, res) => {
    BudgetItem.find({}, function(err, data) {
      res.send(data);
    });
  });

  app.post("/api/budgetItems", requireLogin, async (req, res) => {
    let update = new BudgetItem({
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

  app.put("/api/budgetItems/:id", requireLogin, (req, res) => {
    let update = new BudgetItem({
      _id: req.params.id,
      ...req.body
    });
    update.isNew = false;
    update.save(err => {
      if (err) res.send(err);
      else {
        // res.send({ message: "ok" });
        BudgetItem.find({}, function(err, data) {
          res.send(data);
        });
      }
    });
  });

  app.delete("/api/budgetItems/:id", requireLogin, (req, res) => {
    BudgetItem.findOneAndDelete(
      { _id: req.params.id, uid: req.user._id },
      req.body,
      (err, data) => {
        if (!err) {
          // res.send({ message: "deleted" });
          BudgetItem.find({}, function(err, data) {
            res.send(data);
          });
        } else {
          res.send(err);
        }
      }
    );
  });
};
