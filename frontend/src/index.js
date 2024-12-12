import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./slices/index.js";
import { Provider } from "react-redux";
import { Provider as RollbarProvider, ErrorBoundary } from "@rollbar/react";

import "./utils/i18next.js";

const rollbarConfig = {
  accessToken: "212177b5860e4768b0a6b219d55c6af6",
  environment: "testenv",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <Provider store={store}>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </Provider>
    </ErrorBoundary>
  </RollbarProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
