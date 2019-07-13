const mongoose = require("mongoose");
// const requireLogin = require("../middleware/requireLogin");

const Expense = mongoose.model("expenses");

module.exports = app => {
  // PRIVATE
  app.get(
    "/api/expenses",
    // requireLogin,
    (req, res) => {
      Expense.find({}, function(err, data) {
        res.send(data);
      });
    }
  );

  app.post(
    "/api/expenses",
    // requireLogin,
    async (req, res) => {
      let update = new Expense({
        ...req.body
      });
      try {
        const data = await update.save();
        res.send(data);
      } catch (err) {
        res.status(422).send(err);
      }
    }
  );

  app.put(
    "/api/expenses/:id",
    // requireLogin,
    (req, res) => {
      let update = new Expense({
        _id: req.params.id,
        ...req.body
      });
      update.isNew = false;
      update.save(err => {
        if (err) res.send(err);
        else {
          res.send({ message: "ok" });
        }
      });
    }
  );

  app.delete(
    "/api/expenses/:id",
    // requireLogin,
    (req, res) => {
      Expense.findOneAndDelete(
        { _id: req.params.id },
        req.body,
        (err, data) => {
          if (!err) {
            res.send({ message: "deleted" });
          } else {
            res.send(err);
          }
        }
      );
    }
  );
};
