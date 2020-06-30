import React, { Component} from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import FirstTimeMerchantForm from './FirstTimeMerchantForm';
import MerchantInvoice from './MerchantInvoice';



class MerchantLogin extends Component {
  constructor(props) {
    super(props)
    this.state={
        EmailMessage: null,
        SignedIn: false,
        IdToken: null,
        FormInfoExists: false,
        Alias: "No alias generated",
        SpecialCode: "",
        MessageBox: ""
      }

      this.submitMerchantPayment = this.submitMerchantPayment.bind(this);
      this.submitMerchantInvoice = this.submitMerchantInvoice.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount(){
    var that=this;
    firebase.auth().onAuthStateChanged((user)=>{
      if (user !=null) {this.setState({SignedIn: true})}
      if (this.state.SignedIn){
        
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
          // Send token to your backend via HTTPS
          // ...
          console.log(idToken)

          var url = 'https://kylepence.dev:5000/merchants'

          fetch(url, {
            method:"GET",
            headers: {'Authorization': idToken}
          })
            .then(result => {
                console.log(result)
                // do something with the result
                result.json().then(data => {
                  console.log(data)
                  var docExists = (data.result.docExists.toLowerCase() == "true")
                  console.log(docExists)
                  that.setState({FormInfoExists: docExists})
                  that.setState({IdToken: idToken})
                })
            })

        }).catch(function(error) {
          // Handle error
        });
    } 
    })

  }

  submitMerchantPayment(myPostBody){
    var url = 'https://kylepence.dev:5000/merchants'

    var baseErrorMessage = {
        name: '',
        businessName: '',
        country:'',
        state: '',
        zipcode: '',
        PAN:'',
    }

    fetch(url, {
      method:"POST",
      body: JSON.stringify(myPostBody),
      headers:
          {Authorization: this.state.IdToken}
      }
      )
      .then(result => {
          console.log(result)
          // do something with the result
          result.json().then(data => {
            console.log(data)
            let errorMessage = null
            if (data.status == 'fail') {
              errorMessage = {...baseErrorMessage, ...data.result.errorMessage}
            }
            this.setState({ErrorMessage: errorMessage})
            if (data.status=="success"){
              this.setState({FormInfoExists: true})
            }
          })
      })
    
  }

  submitMerchantInvoice(myPostBody){
    var url = 'https://kylepence.dev:5000/invoices'

    var baseErrorMessage = {
        businessName: '',
        email: ''
    }

    fetch(url, {
      method:"POST",
      body: JSON.stringify(myPostBody),
      headers:
          {Authorization: this.state.IdToken}
      })
      .then(result => {
        console.log(result)
        // do something with the result
        result.json().then(data => {
          console.log(data)
          console.log(data.result.invoiceCode)
          let errorMessage = null
          if (data.status == 'fail') {
            errorMessage = {...baseErrorMessage, ...data.result.errorMessage}
          }
          this.setState({Alias: data.result.invoiceCode,
            ErrorMessage: errorMessage})
        })
    })
    
  }

  handleLogout(e) {
    firebase.auth().signOut().then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }


  render() {
    const that2 = this;

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
        signInFlow: 'popup',
        
        callbacks: {
          signInSuccessWithAuthResult: (authResult, redirectUrl) => {
            this.setState({SignedIn: true})
            return false;
          },
        
        },
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ]
      };

      if (that2.state.SignedIn){
        if (!that2.state.FormInfoExists){
          
        
          return (
            <div className="MerchantLogin">
            <h2 class="VisaBlue">First Time Merchant Form</h2>
            <FirstTimeMerchantForm action={this.submitMerchantPayment} ErrorMessage={this.state.ErrorMessage}></FirstTimeMerchantForm>
          </div> 
          )
        }


        return (
          <div className="MerchantLogin">
            <h2 class="VisaBlue">Invoice Creation Form</h2>
                <MerchantInvoice action={this.submitMerchantInvoice} IdToken={this.state.IdToken} Alias={this.state.Alias} ErrorMessage={this.state.ErrorMessage}></MerchantInvoice>
                <br></br>
                <br></br>
              <Form onSubmit={this.handleLogout}>
                <Button variant="primary" type="submit" id="buttonLogout">
                  <a id='logoutText'>Logout</a>
                </Button>
              </Form>
          </div> 
          )
      }
    

    const that = this;
    return (
        <div className="MerchantLogin">
          <h2 class="VisaBlue">Login Page</h2>
            <div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth() }/>
            </div>
            <Button variant="secondary" onClick={()=>that.props.setWantsToLogIn(false)} id="buttonBlue">
                Skip logging in
            </Button>
        </div>  
        
      );
  }
}

export default MerchantLogin;
