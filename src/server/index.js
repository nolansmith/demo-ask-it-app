var path = require("path");
var express = require("express");
var app = express();
const helmet = require('helmet');
const cors = require('cors');
const compress = require('compression');

/* some middleware */
/* header security */
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "*.amazonaws.com"]
    }
  })
);
app.use(helmet.referrerPolicy({ policy: "same-origin" }));

/* CORS */
app.use(cors());

/* compression */
app.use(compress());

app.disable("x-powered-by");

let services = require("./services/index.js");

/* utilities to pass down through our application */
let utils = {
  db: services.db
};

/* our .env file with configuration and env variables */
if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config({
    path: path.resolve(__dirname, "/server.env")
  });
}

/* check if we are applying the GraphQL middleware to this server instance */
if (process.env.IS_ALSO_GRAPHQL && process.env.IS_ALSO_GRAPHQL === "yes") {
  console.log("[!] Applying GraphQL Middleware...");
  let graphql = services.graphql.default(utils);
  graphql.applyMiddleware({ app });
}

/* directory we are gonna serve our files from */
const rootDir = path.resolve(__dirname, "../../prod/webapp");
app.use("/", express.static(rootDir));

var httpPort = process.env.PORT || 3000;
var httpsPort = process.env.HTTPS || 443;

app.get("/*", function(req, res) {
  res.sendFile(rootDir + "/index.html");
});

app.listen(httpPort, () =>
  console.log(`[+] HTTP WebServer started on port ${httpPort}`)
);

/* listen with https service */
if (process.env.USING_HTTPS === "yes") {
  services
  .https(app)
  .listen(httpsPort, () =>
    console.log(`[+] HTTPS WebServer started on port ${httpsPort}`)
  );
}
