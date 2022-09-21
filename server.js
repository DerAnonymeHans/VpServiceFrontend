/** @format */

const express = require("express");
const serveStatic = require("serve-static");
const bodyParser = require("body-parser");
const webpush = require("web-push");
const path = require("path");
const { initializeApp } = require("firebase-admin/app");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.text());

app.use("/", serveStatic(path.join(__dirname, "/dist")));
app.use("/Statistiken", serveStatic(path.join(__dirname, "/dist")));
app.use("/Benachrichtigung", serveStatic(path.join(__dirname, "/dist")));
app.use("/Mitmachen", serveStatic(path.join(__dirname, "/dist")));

const pubKey = process.env.PUSH_PUB_KEY;
const privKey = process.env.PUSH_PRIV_KEY;

webpush.setVapidDetails("mailto:vp.mailservice.kepler@gmail.com", pubKey, privKey);
webpush.setGCMAPIKey(process.env.GCM_SERVER_KEY);

app.post("/SendPush", (req, res) => {
   console.log("Push Notification requested for user: " + req.body.options.data);
   let subscription, payload;
   try {
      if (req.body === undefined || req.body === null) throw new Error("Body is null or undefined");
      subscription = JSON.parse(req.body.subscription);
      payload = JSON.stringify(req.body.options);
      if (subscription === undefined) throw new Error("Missing subscribtion object");
      if (payload === undefined) throw new Error("Missing options object");
   } catch (e) {
      res.status(500).json(e);
      return;
   }

   webpush
      .sendNotification(subscription, payload)
      .then((pushRes) => {
         console.log("Send push notification.");
         res.status(200).json({});
      })
      .catch((err) => {
         console.log(err);
         res.status(500).json(err);
      });
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log("Starting on port " + port);
