import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import firebase from "firebase/app";
import store from "./store";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

const fbConfig = {
  apiKey: "AIzaSyDerHt8xDtrvOoXSG459u916mbv8hsD4Pw",
  authDomain: "phonepayhack.firebaseapp.com",
  databaseURL: "https://phonepayhack.firebaseio.com",
  projectId: "phonepayhack",
  storageBucket: "phonepayhack.appspot.com",
  messagingSenderId: "32460783807",
  appId: "1:32460783807:web:76fdb309ad2af726fac60a",
  measurementId: "G-0C830E4Y1Q",
};

const rrfConfig = {
  useFirestoreForProfile: true,
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

firebase.initializeApp(fbConfig);

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Router>
        <App />
      </Router>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
