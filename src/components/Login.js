import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useHistory } from "react-router";
import { Button } from "react-bootstrap";

import * as firebase from "firebase/app";
import "firebase/auth";

function Login() {
  const firebase = useFirebase();
  const history = useHistory();
  const auth = useSelector((state) => state.firebase.auth);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (isLoaded(auth) && !isEmpty(auth)) {
      history.push("/merchantform");
    }
    return () => {};
  }, [auth, history]);

  const handleSubmit = (event) => {
    event.preventDefault();
    firebase
      .login({ email, password })
      .then(() => {
        history.push("/merchantform");
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "auth/user-not-found") {
          firebase.createUser({ email, password, email }).catch((err) => {
            setError(err.message);
          });
        } else {
          setError(err.message);
        }
      });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <br />
      <h1 className="VisaBlue" id="header">
        Login / Create Account Here
      </h1>
      <div className="login">
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <div className="input-container">
              <input
                className="login-input"
                type="text"
                name="email"
                placeholder=" "
                onChange={handleEmailChange}
                required
              />
              <label className="login-label" htmlFor="email">
                Email
              </label>
            </div>
            <div className="input-container">
              <input
                className="login-input"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder=" "
                onChange={handlePasswordChange}
                required
              />
              <label className="login-label" htmlFor="password">
                Password
              </label>
            </div>
            <label className="error-text">{error || " "}</label>
            <Button variant="primary" type="submit" id="buttonBlue">
              <span id="submitText">Submit</span>
              <span id="goldenArrow">➤</span>
            </Button>
          </div>
        </form>
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
      </div>
    </div>
  );
}

export default Login;
