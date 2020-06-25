import React, { Component} from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'



class MerchantLogin extends Component {
  constructor(props) {
    super(props)
    this.state={
        Response: "Not yet requested",
        Alias: "No alias generated",
        SpecialCode: "",
        MessageBox: ""
      }

     
      
  }

  



  render() {

    const config = {
      apiKey: "***REMOVED***",
      authDomain: "phonepayhack.firebaseapp.com",
      databaseURL: "https://phonepayhack.firebaseio.com",
      projectId: "phonepayhack",
      storageBucket: "phonepayhack.appspot.com",
      messagingSenderId: "32460783807",
      appId: "1:32460783807:web:76fdb309ad2af726fac60a",
      measurementId: "G-0C830E4Y1Q"
    };

    if (!firebase.apps.length){
        firebase.initializeApp(config);
    }
    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        signInSuccessUrl: '/signedIn',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
          firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,  
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ]
      };


    const that = this;
    return (
        <div className="MerchantLogin">
          <h2 class="VisaBlue">Login Page</h2>
            <div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
            </div>
            <Button variant="secondary" onClick={()=>that.props.setWantsToLogIn(false)} id="buttonBlue">
                Skip logging in
            </Button>
        </div>  
        
      );
  }
}

export default MerchantLogin;