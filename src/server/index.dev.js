

/**
 * DEVELOPMENT SERVER TO USE WHILE WORKING ON YOUR UI
 * DOES NOT USE HTTPS
 */



const express = require("express");
const session = require("express-session");
const app = express();

const cors = require("cors");
const compress = require("compression");
const uuid = require("uuid/v4");
/* custom services for the application */
const services = require("./services/index.js");
/* utilities to pass down through our application */
const utils = {
  db: services.db
};
/* server auth */
const auth = services.auth(utils);

/* body parser stuff */
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    cookie: {
      secure: true
    },
    secret: process.env.SERVER_SESSION,
    name: process.env.SERVER_SESSION_COOKIE,
    resave: false,
    saveUninitialized: true,
    unset: "destroy",
    genid: req => {
      // Returns a random string to be used as a session
      return uuid();
    }
  })
);

// /* CORS */
app.use(cors({
  origin: '*'
}));

// /* compression */
app.use(compress());

app.disable("x-powered-by");

/* check if we are applying the GraphQL middleware to this server instance */

console.log("[DEVELOPMENT] Applying GraphQL Middleware...");
const graphql = services.graphql.default(utils);
graphql.applyMiddleware({ app });

const httpPort = process.env.PORT || 3000;

app.post("/login", async (req, res, next) => {
  //console.log('POST: ', req.body);

  if (req.session.user) return res.json({ loginError: "already logged in" });

  let { username, password } = req.body;
  let { loginError, user } = await auth.tryToLogUserIn({ username, password });
  if (loginError) return res.json({ loginError });
  req.session.user = { username };
  req.session.salt = uuid();
  //console.log("Salt created: ", req.session.salt);
  next();
});

app.post("/login", async (req, res, next) => {
  let { username } = req.session.user;
  let token = auth.createUserLoginToken({
    username,
    salt: req.session.salt,
    time: new Date().toLocaleDateString()
  });
  let response = { username, token };
  req.session.user = { ...response, lastActive: new Date().getTime() };

  res.json(response);
  next();
});

app.get('/token/:token', (req,res,next) => {
  res.json(auth.checkUserLoginToken(req.params.token));
 
})

app.get("/*", (req, res) => {
  if (req.session.user) {
    //console.log("Authorization: ", req.headers.authorization);
    let { token } = req.session.user;
    let { valid } = auth.checkUserLoginToken(token);
  } else {
    console.log("No Req Session User");
  }

  res.send("Development only :-(");
});

app.listen(httpPort, () =>
  console.log(`[DEVELOPMENT] HTTP WebServer started on port ${httpPort}`)
);
