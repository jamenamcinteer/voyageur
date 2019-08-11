const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const Checklist = mongoose.model("checklists");

module.exports = app => {
  // PRIVATE
  app.get("/api/checklists", requireLogin, (req, res) => {
    Checklist.find({ uid: req.user._id }, function(err, data) {
      res.send(data);
    });
  });

  app.post("/api/checklists", requireLogin, async (req, res) => {
    let update = new Checklist({
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

  app.put("/api/checklists/:id", requireLogin, (req, res) => {
    let update = new Checklist({
      _id: req.params.id,
      uid: req.user._id,
      ...req.body
    });
    update.isNew = false;
    update.save(err => {
      if (err) res.send(err);
      else {
        // res.send({ message: "ok" });
        Checklist.find({ uid: req.user._id }, function(err, data) {
          res.send(data);
        });
      }
    });
  });

  app.delete("/api/checklists/:id", requireLogin, (req, res) => {
    Checklist.findOneAndDelete(
      { _id: req.params.id, uid: req.user._id },
      req.body,
      (err, data) => {
        if (!err) {
          // res.send({ message: "deleted" });
          Checklist.find({ uid: req.user._id }, function(err, data) {
            res.send(data);
          });
        } else {
          res.send(err);
        }
      }
    );
  });
};
