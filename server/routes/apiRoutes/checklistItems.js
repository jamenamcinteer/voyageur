const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const ChecklistItems = mongoose.model("checklistItems");

module.exports = app => {
  // PRIVATE
  app.get("/api/checklistItems", requireLogin, (req, res) => {
    ChecklistItems.find({ uid: req.user._id }, function(err, data) {
      res.send(data);
    });
  });

  app.post("/api/checklistItems", requireLogin, async (req, res) => {
    let update = new ChecklistItems({
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

  app.put("/api/checklistItems/:id", requireLogin, (req, res) => {
    let update = new ChecklistItems({
      _id: req.params.id,
      uid: req.user._id,
      ...req.body
    });
    update.isNew = false;
    update.save(err => {
      if (err) res.send(err);
      else {
        // res.send({ message: "ok" });
        ChecklistItems.find({ uid: req.user._id }, function(err, data) {
          res.send(data);
        });
      }
    });
  });

  app.delete("/api/checklistItems/:id", requireLogin, (req, res) => {
    ChecklistItems.findOneAndDelete(
      { _id: req.params.id, uid: req.user._id },
      req.body,
      (err, data) => {
        if (!err) {
          // res.send({ message: "deleted" });
          ChecklistItems.find({ uid: req.user._id }, function(err, data) {
            res.send(data);
          });
        } else {
          res.send(err);
        }
      }
    );
  });
};
