import React from "react";
const { useEffect } = require("react");
const { useFirebase } = require("react-redux-firebase");
const { useHistory } = require("react-router");

function Logout() {
  const firebase = useFirebase();
  const history = useHistory();

  console.log(history);

  useEffect(() => {
    const signout = async () => {
      await firebase.logout();
      history.push("/login");
    };
    signout();
  }, [firebase, history]);

  return <div>Logging you out!</div>;
}

export default Logout;
