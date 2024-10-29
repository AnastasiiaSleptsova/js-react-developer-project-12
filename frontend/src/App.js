import { BrowserRouter } from "react-router-dom";
import { Router } from "./components/app/Router";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./components/pages/Header/Header";
import { Footer } from "./components/pages/Footer/Footer";
import React from "react";
import { Provider, ErrorBoundary } from "@rollbar/react"; 

import classes from "./App.module.css";

const rollbarConfig = {
  accessToken: "POST_CLIENT_ITEM_ACCESS_TOKEN",
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: "production",
  server: {
    root: "http://example.com/",
    branch: "main",
  },
  code_version: "0.13.7",
  payload: {
    person: {
      id: 117,
      email: "chief@unsc.gov",
      username: "john-halo",
    },
  },
};

function App() {
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <div className={classes.app}>
          <BrowserRouter>
            <div className={classes.wrapper}>
              <Header />
              <div className={classes.content}>
                <Router />
              </div>
              <footer className={classes.footer}>
                <Footer />
              </footer>
            </div>
          </BrowserRouter>
        </div>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
