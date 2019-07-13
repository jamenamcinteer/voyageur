const mongoose = require("mongoose");
// const requireLogin = require("../middleware/requireLogin");

const User = mongoose.model("users");

module.exports = app => {
  // app.put(
  //   "/api/users/:id",
  //   requireLogin,
  //   (req, res) => {

  //     let update = new User({ _id: req.params.id, ...req.body });
  //     update.isNew = false;
  //     update.save(err => {
  //       if (err) res.send(err);
  //       else {
  //         res.send({ message: "ok" });
  //       }
  //     });
  //   }
  // );

  // PUBLIC
  app.get("/api/users/:id", (req, res) => {
    User.find({ _id: req.params.id }, function(err, users) {
      if (users.length > 0) {
        res.send(users[0]);
      } else {
        res.send(null);
      }
    });
  });
};
