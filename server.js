const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');

const app = express();

app.use("/", serveStatic(path.join(__dirname, "./index.html")))
app.use("/Statistiken", serveStatic(path.join(__dirname, "./index.html")))
app.use("/Benachrichtigung", serveStatic(path.join(__dirname, "./index.html")))

const port = process.env.PORT || 8080;
app.listen(port);

console.log("Starting on port " + port);