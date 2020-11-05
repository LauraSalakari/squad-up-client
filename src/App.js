import React, { Component } from 'react'
import "./App.css";
import MyNav from './components/MyNav';
import MyGuestNav from './components/MyGuestNav';
import SignUpForm from './components/SignUpForm';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <MyNav /> */}
        <MyGuestNav />
        <SignUpForm />
      </div>
    )
  }
}
