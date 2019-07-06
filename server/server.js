import config from "universal-config";
import Unsplash, { toJson } from "unsplash-js";
var express = require("express");
var cors = require("cors");

var app = express();

var whitelist = ["http://localhost:3000"];
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
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

// console.log(userAuthentication(code));
// photos();
// collections();

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

// function userAuthentication(code) {
//   return unsplash.auth.userAuthentication(code)
//     .then(toJson)
//     .then(json => json.access_token);
// }

function photos() {
  console.log("\nPhotos");

  unsplash.photos
    .listPhotos(1, 10)
    .then(toJson)
    .then(json => {
      console.log(json);
    });

  unsplash.photos
    .searchPhotos("bear", undefined, 1, 1)
    .then(toJson)
    .then(json => {
      console.log(json);
    });

  unsplash.photos
    .getPhoto("kZ8dyUT0h30")
    .then(toJson)
    .then(json => {
      console.log(json);
    });

  unsplash.photos
    .getRandomPhoto({ featured: true })
    .then(toJson)
    .then(json => {
      console.log(json.links.html);
    });
}

function collections() {
  console.log("\nCollections");

  unsplash.collections
    .listCollections(1, 10)
    .then(toJson)
    .then(json => {
      console.log(json);
    });

  unsplash.collections
    .listCuratedCollections(1, 10)
    .then(toJson)
    .then(json => {
      console.log(json);
    });

  unsplash.collections
    .getCollection(151165)
    .then(toJson)
    .then(json => {
      console.log(json);
    });

  unsplash.collections
    .getCuratedCollection(94)
    .then(toJson)
    .then(json => {
      console.log(json);
    });

  unsplash.collections
    .getCollectionPhotos(151165)
    .then(toJson)
    .then(json => {
      console.log(json);
    });

  unsplash.collections
    .getCuratedCollectionPhotos(94)
    .then(toJson)
    .then(json => {
      console.log(json);
    });
}

app.listen(3001, function() {});
