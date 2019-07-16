import config from "universal-config";
import Unsplash, { toJson } from "unsplash-js";
const path = require("path");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
var compression = require("compression");
var sslRedirect = require("heroku-ssl-redirect");
var express = require("express");
var cors = require("cors");
require("./models/User");
require("./models/Trip");
require("./models/BudgetCategory");
require("./models/BudgetItem");
require("./models/Expense");
require("./services/passport");

mongoose.connect(config.get("MONGO_URI"));

var app = express();

app.use(compression());

app.use(sslRedirect());

app.use(bodyParser.json());

var whitelist = ["http://localhost:3000/", "http://localhost:3001/"];
var corsOptions = {
  origin: function(origin, callback) {
    // console.log(origin);
    // console.log(whitelist.indexOf(origin));
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

app.use(cors(corsOptions));

app.get("/ping", function(req, res) {
  res.send("pong");
});

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days before it expires
    keys: [config.get("COOKIE_KEY")] // key to encrypt our cookie, can be any random string of characters; can add multiple keys as an additional layer of security
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/apiRoutes/trips")(app);
require("./routes/apiRoutes/budgetCategories")(app);
require("./routes/apiRoutes/budgetItems")(app);
require("./routes/apiRoutes/expenses")(app);
require("./routes/apiRoutes/users")(app);

const unsplash = new Unsplash({
  applicationId: config.get("UNSPLASH_APPLICATION_ID"),
  secret: config.get("UNSPLASH_SECRET"),
  callbackUrl: config.get("UNSPLASH_CALLBACK_URL")
});

unsplash.auth.getAuthenticationUrl([
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

//production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "build"))); //
  app.get("*", (req, res) => {
    res.sendfile(path.join((__dirname, "..", "build/index.html")));
  });
} else {
  //build mode
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/index.html"));
  });
}

app.listen(process.env.PORT || 3001, function() {});
