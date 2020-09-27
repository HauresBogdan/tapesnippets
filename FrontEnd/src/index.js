import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'react-app-polyfill/ie9';
import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import allReducers from "./reducers/combinedReducers";
import { Provider } from "react-redux";
import HttpsRedirect from 'react-https-redirect';


const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <HttpsRedirect>
  <Provider store={store}>
    <App />
  </Provider>
  </HttpsRedirect>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls. Learn
// more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
