import config from "universal-config";
import Unsplash, { toJson } from "unsplash-js";
var express = require("express");
var cors = require("cors");

var app = express();

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

const unsplash = new Unsplash({
  applicationId: config.get("APPLICATION_ID"),
  secret: config.get("SECRET"),
  callbackUrl: config.get("CALLBACK_URL")
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
