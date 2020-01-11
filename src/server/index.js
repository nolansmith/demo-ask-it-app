var path = require("path");
var express = require("express");
var app = express();
app.disable('x-powered-by');
let services = require("./services/index.js");

/* for our https certificate */
const https = require("https");
const fs = require("fs");

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

var port = process.env.PORT || 80;

app.get("/*", function(req, res) {
  res.sendFile(rootDir + "/index.html");
});

app.listen(port, () => console.log(`[+] WebServer started on port ${port}`));

/* setup for https (self-signed certificate) */
// https.createServer({
//     key: fs.readFileSync(path.resolve(__dirname, '../../server-key.pem')),
//     cert: fs.readFileSync(path.resolve(__dirname, '../../server-cert.pem'))
//   }, app)
//   .listen(port, () => console.log(`[+] WebServer started on port ${port}`));
