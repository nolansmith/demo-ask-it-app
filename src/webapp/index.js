//styles and stuff
import(
  /*webpackChunkName: "bootstrapcss" */ "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
);
import(
  /*webpackChunkName: "jquery" */ "../../node_modules/jquery/dist/jquery.min.js"
);
import(
  /*webpackChunkName: "popper" */ "../../node_modules/popper.js/dist/popper.min.js"
);
import(
  /*webpackChunkName: "bootstrapjs" */ "../../node_modules/bootstrap/dist/js/bootstrap.min.js"
);

import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

//apollo configuration
import { ApolloProvider } from "@apollo/react-hooks";
import apolloClient from "./config/apollo/index.js";

//redux information
import { Provider } from "react-redux";
import store from "./store/index.js";

//a wrapper component for authentication
import LoginValidator from "./components/validator";

// use the block below to remove lazy-load
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "../../node_modules/jquery/dist/jquery.min.js";
// import "../../node_modules/popper.js/dist/popper.min.js";
// import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";

//store options
let storeOptions = {
  thunk: {
    arguments: {
      client: apolloClient
    }
  }
};

import Loading from "./components/loading/index.js";
const Header = React.lazy(() =>
  import(/* webpackChunkName: "Header" */ "./components/primary/Header")
);

const Footer = React.lazy(() =>
  import(/* webpackChunkName: "Footer" */ "./components/primary/Footer")
);
const Main = React.lazy(() =>
  import(/* webpackChunkName: "Main" */ "./components/primary/Main.js")
);

const AppStatusBoundary = React.lazy(() =>
  import(
    /* webpackChunkName: "AppStatusBoundary" */ "./components/primary/AppStatusBoundary.js"
  )
);

import ScrollToTop from "./components/routes/ScrollToTop";

const App = function(props) {
  return (
    <Router>
      <ScrollToTop />
      {props.children}
    </Router>
  );
};

render(
  <ApolloProvider client={apolloClient}>
    <Provider store={store(storeOptions)}>
      <App>
        <LoginValidator>
          <React.Suspense fallback={<Loading />}>
            <Header />
            <AppStatusBoundary>
              <Main />
              <Footer />
            </AppStatusBoundary>
          </React.Suspense>
        </LoginValidator>
      </App>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
