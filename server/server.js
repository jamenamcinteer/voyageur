import config from "universal-config";
import Unsplash, { toJson } from "unsplash-js";
const path = require("path");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
var express = require("express");
var cors = require("cors");
require("./models/User");
require("./services/passport");

mongoose.connect(config.get("MONGO_URI"));

var app = express();

app.use(bodyParser.json());

var whitelist = ["http://localhost"];
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

app.use(cors(corsOptions));

app.get("/", function(req, res) {
  res.send("Hello World!");
});

const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days before it expires
    keys: [config.get("COOKIE_KEY")] // key to encrypt our cookie, can be any random string of characters; can add multiple keys as an additional layer of security
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

const unsplash = new Unsplash({
  applicationId: config.get("UNSPLASH_APPLICATION_ID"),
  secret: config.get("UNSPLASH_SECRET"),
  callbackUrl: config.get("UNSPLASH_CALLBACK_URL")
});

let authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public",
  "read_photos",
  "read_collections"
]);

app.get("/photos", function(req, res) {
  var keyword = req.param("keyword");
  unsplash.photos
    // .searchPhotos(keyword, undefined, 1, 1)
    .getRandomPhoto({
      query: keyword,
      // featured: true,
      orientation: "landscape",
      count: 30
    })
    .then(toJson)
    .then(json => {
      // console.log(json);
      res.send(json);
    });
});

app.listen(3001, function() {});
