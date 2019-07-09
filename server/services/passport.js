import config from "universal-config";
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: config.get("GOOGLE_CLIENT_ID"),
      clientSecret: config.get("GOOGLE_CLIENT_SECRET"),
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            photoURL: profile.photos[0].value
          })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: config.get("FACEBOOK_CLIENT_ID"),
//       clientSecret: config.get("FACEBOOK_CLIENT_SECRET"),
//       callbackURL: "/auth/facebook/callback",
//       profileFields: ["id", "displayName", "email", "profile_pic"]
//     },
//     function(accessToken, refreshToken, profile, done) {}
//   )
// );
