import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useHistory } from "react-router";

import * as firebase from "firebase/app";
import "firebase/auth";

function Login() {
  const firebase = useFirebase();
  const history = useHistory();
  const auth = useSelector((state) => state.firebase.auth);

  useEffect(() => {
    if (isLoaded(auth) && !isEmpty(auth)) {
      history.push("/merchantform");
    }
    return () => {};
  }, [auth, history]);

  return (
    <div>
      <StyledFirebaseAuth
        uiConfig={{
          signInFlow: "popup",
          signInSuccessUrl: "/merchantform",
          signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
          callbacks: {
            signInSuccessWithAuthResult: (authResult, redirectUrl) => {
              console.log(redirectUrl);
              firebase.handleRedirectResult(authResult).then(() => {
                console.log(redirectUrl);
                history.push(redirectUrl);
              });
              return true;
            },
          },
        }}
        firebaseAuth={firebase.auth()}
      />
      <div id="header">
        <h2>Auth</h2>
        {!isLoaded(auth) ? (
          <span>Loading...</span>
        ) : isEmpty(auth) ? (
          <span>Not Authed</span>
        ) : (
          <pre>Auth Success!</pre>
        )}
      </div>
    </div>
  );
}

export default Login;
