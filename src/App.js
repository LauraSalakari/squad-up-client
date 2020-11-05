import React, { Component } from 'react'
import "./App.css";
import { withRouter, Route, Switch } from 'react-router-dom';
import { API_URL } from "./config";
import Axios from 'axios';
import Landing from './components/Landing';
import MyNav from './components/MyNav';
import MyGuestNav from './components/MyGuestNav';
import SignUpForm from './components/SignUpForm';
import SignIn from "./components/SignIn"

class App extends Component {

  state = {
    user: null,
    errorMessage: null
  }

  //signup
  handleSignUp = (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = e.target;
    Axios.post(`${API_URL}/signup`, {
      username: username.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    }, { withCredentials: true })
      .then((response) => {
        this.setState({
          user: response.data
        }, () => {
          this.props.history.push("/"); //change this to prof edit page!!// technically this shouldn't change the user state??
        })
      })
      .catch((err) => {
        this.setState({
          errorMessage: err.response.data.errorMessage
        })
      })
  }

  //signin
  handleSignIn = (e) => {
    e.preventDefault();
    const { email, password } = e.target;

    Axios.post(`${API_URL}/signin`, {
      email: email.value,
      password: password.value
    }, { withCredentials: true })
      .then((response) => {
        this.setState({
          ser: response.data
        }, () => {
          this.props.history.push("/"); //where should this actually redirect?
        })
      })
      .catch((err) => {
        this.setState({
          errorMessage: err.response.data.errorMessage
        })
      })

  }

  //logout


  //handle errormessages onunmount for now
  handleUnmount = () => {
    console.log("Gets called on unmount")
    this.setState({
      errorMessage: null
    })
  }

  render() {
    const { errorMessage, user } = this.state;

    return (
      <div className="App">
        {user ? <MyNav /> : <MyGuestNav />}
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/signup" render={(routeProps) => {
            return <SignUpForm onUnmount={this.handleUnmount} errorMessage={errorMessage} onSignUp={this.handleSignUp} {...routeProps} />
          }} />
          <Route path="/signin" render={(routeProps) => {
            return <SignIn onUnmount={this.handleUnmount} errorMessage={errorMessage} onSignIn={this.handleSignIn} {...routeProps} />
          }} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)