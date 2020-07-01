import React from "react";
import { Switch, Route, Link, Redirect, useHistory } from "react-router-dom";
import "./App.css";
import { Nav, Navbar } from "react-bootstrap";
import Home from "./components/Home";
import MerchantInvoiceFull from "./components/MerchantInvoiceFull.js";
import MerchantInfoForm from "./components/MerchantInfoForm";
import Login from "./components/Login";
import Payment from "./components/Payment";
import { isLoaded, isEmpty, useFirebase } from "react-redux-firebase";
import { useSelector } from "react-redux";
import MerchantInvoice from "./components/MerchantInvoice";
import LoadingPage from "./components/LoadingPage";
import { Button } from "react-bootstrap";

function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth)) return <LoadingPage />;
  return children;
}

function PrivateRoute({ children, ...rest }) {
  const auth = useSelector((state) => state.firebase.auth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoaded(auth) && !isEmpty(auth) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function App() {
  const firebase = useFirebase();
  const auth = useSelector((state) => state.firebase.auth);
  const history = useHistory();
  const logout = () => {
    firebase.logout();
    history.push("/login");
  };
  return (
    <div>
      <Navbar className="navBlue">
        <Navbar.Brand>
          <img
            src="https://cdn.visa.com/cdn/assets/images/logos/visa/logo.png"
            className="visaLogo"
            alt="visa logo"
          ></img>
        </Navbar.Brand>
        <Nav className="navBlue" id="navOptions">
          <Link className="navText" to="/">
            Consumer
          </Link>
          <Link className="navText" to="/merchant">
            Merchant
          </Link>
          <Link className="navText" to="/login">
            Login
          </Link>
          <Button className="navText" onClick={logout}>
            Logout
          </Button>
        </Nav>
      </Navbar>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/invoice/">
          <Home />
        </Route>
        <Route exact path="/invalid/">
          <h1>Invoice code is expired or invalid.</h1>
        </Route>
        <Route exact path="/invoice/:id" component={Payment} />
        <Route
          path="/merchant"
          render={({ location }) =>
            isLoaded(auth) && !isEmpty(auth) ? (
              <AuthIsLoaded>
                <MerchantInvoice />
              </AuthIsLoaded>
            ) : (
              <MerchantInvoiceFull />
            )
          }
        />
        <Route path="/login">
          <Login></Login>
        </Route>
        <AuthIsLoaded>
          <PrivateRoute path="/merchantform">
            <MerchantInfoForm />
          </PrivateRoute>
        </AuthIsLoaded>
      </Switch>
    </div>
  );
}

export default App;
