/**
 * Standalone file if you want to run GraphQL server separately
 */

var path = require('path');
var express = require('express');
var app = express();
let services = require('../index.js');
let utils = {
    db: services.db
};

/* apply middleware to our express server, which is `app` */
let graphql = services.graphql.default(utils);
graphql.applyMiddleware({app})

var port = process.env.GRAPHQL_PORT || 8001;




/* Basically field all get requests and send back it's only a GraphQL server */
app.get("/*", function(req,res) {
    res.send("GraphQL Only :-)")
});


/* Serve graphql over https */
services.https(app).listen(port, () => console.log(`[+] GraphQL server started on port ${port}`));