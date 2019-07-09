const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/auth/current_user");
    }
  );

  // app.get("/auth/facebook", passport.authenticate("facebook"));

  // app.get(
  //   "/auth/facebook/callback",
  //   passport.authenticate("facebook"),
  //   (req, res) => {
  //     res.redirect("/registration");
  //   }
  // );

  app.get("/auth/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/auth/current_user", (req, res) => {
    res.send(req.user);
  });
};
