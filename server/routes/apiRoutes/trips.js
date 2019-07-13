const mongoose = require("mongoose");
// const requireLogin = require("../middleware/requireLogin");

const Trip = mongoose.model("trips");

module.exports = app => {
  // PRIVATE
  app.get(
    "/api/trips",
    // requireLogin,
    (req, res) => {
      Trip.find({}, function(err, trips) {
        res.send(trips);
      });
    }
  );

  app.post(
    "/api/trips",
    // requireLogin,
    async (req, res) => {
      let update = new Trip({
        ...req.body
      });
      try {
        const trip = await update.save();
        res.send(trip);
      } catch (err) {
        console.log(err);
        res.status(422).send(err);
      }
    }
  );

  app.put(
    "/api/trips/:id",
    // requireLogin,
    (req, res) => {
      let update = new Trip({
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
    "/api/trips/:id",
    // requireLogin,
    (req, res) => {
      Trip.findOneAndDelete({ _id: req.params.id }, req.body, (err, data) => {
        if (!err) {
          res.send({ message: "deleted" });
        } else {
          res.send(err);
        }
      });
    }
  );
};
