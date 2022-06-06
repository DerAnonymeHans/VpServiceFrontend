const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');

const app = express();

app.use("/", serveStatic(path.join(__dirname, "/dist")))

const port = import.meta.env.VITE_PORT || 8080;
app.listen(port);

console.log("Starting on port " + port);