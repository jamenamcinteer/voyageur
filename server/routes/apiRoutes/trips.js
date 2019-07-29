const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const Trip = mongoose.model("trips");

module.exports = app => {
  // PRIVATE
  app.get("/api/trips", requireLogin, (req, res) => {
    Trip.find({ uid: req.user._id }, function(err, trips) {
      res.send(trips);
    });
  });

  app.post("/api/trips", requireLogin, async (req, res) => {
    let update = new Trip({
      uid: req.user._id,
      ...req.body
    });
    try {
      const trip = await update.save();
      res.send(trip);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.put("/api/trips/:id", requireLogin, (req, res) => {
    let update = new Trip({
      _id: req.params.id,
      uid: req.user._id,
      ...req.body
    });
    update.isNew = false;
    update.save(err => {
      if (err) res.send(err);
      else {
        // res.send({ message: "ok" });
        Trip.find({ uid: req.user._id }, function(err, trips) {
          res.send(trips);
        });
      }
    });
  });

  app.delete("/api/trips/:id", requireLogin, (req, res) => {
    Trip.findOneAndDelete(
      { _id: req.params.id, uid: req.user._id },
      req.body,
      (err, data) => {
        if (!err) {
          // res.send({ message: "deleted" });
          Trip.find({ uid: req.user._id }, function(err, trips) {
            res.send(trips);
          });
        } else {
          res.send(err);
        }
      }
    );
  });
};
