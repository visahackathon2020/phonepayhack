import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useHistory } from "react-router";
import { Redirect } from "react-router-dom";

import * as firebase from "firebase/app";
import "firebase/auth";

function Login() {
  const firebase = useFirebase();
  const history = useHistory();
  const auth = useSelector((state) => state.firebase.auth);

  useEffect(() => {
    return () => {
      if (isLoaded(auth) && !isEmpty(auth)) {
        return <Redirect to="/merchantform"></Redirect>;
      }
    };
  }, [auth]);

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
      <div>
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
