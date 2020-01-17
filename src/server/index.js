var path = require("path");
var express = require("express");
var app = express();
app.disable('x-powered-by');
let services = require("./services/index.js");

/* utilities to pass down through our application */
let utils = {
  db: services.db
};

/* our .env file with configuration and env variables */
require("dotenv").config({
  path: path.resolve(__dirname, "../../.env")
});

/* check if we are applying the GraphQL middleware to this server instance */
if (process.env.IS_ALSO_GRAPHQL && process.env.IS_ALSO_GRAPHQL === "yes") {
  console.log("[!] Applying GraphQL Middleware...");
  let graphql = services.graphql.default(utils);
  graphql.applyMiddleware({ app });
}


/* directory we are gonna serve our files from */
const rootDir = path.resolve(__dirname, "../../build");
app.use("/", express.static(rootDir));

var httpPort = process.env.HTTP || 80;
var httpsPort = process.env.HTTPS || 443;

app.get("/*", function (req, res) {
  res.sendFile(rootDir + "/index.html");
});

app.listen(httpPort, () => console.log(`[+] HTTP WebServer started on port ${httpPort}`));

/* listen with https service */
services.https(app).listen(httpsPort, () => console.log(`[+] HTTPS WebServer started on port ${httpsPort}`));


