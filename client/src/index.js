import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";
import { BrowserRouter as Router} from "react-router-dom";
import reportWebVitals from './reportWebVitals';

let startApp = () => {
  ReactDOM.render(
    <Router>
    <Auth0ProviderWithHistory>
      <App />
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById("root")
  );
}

if(!window.cordova) {
  startApp()
} else {
  document.addEventListener('deviceready', startApp, false)
}

reportWebVitals();

