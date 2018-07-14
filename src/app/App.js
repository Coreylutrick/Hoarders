import React, { Component } from 'react';
import {Route, BrowserRouter, Redirect, Switch}  from 'react-router-dom';
import firebase from 'firebase';

import './App.css';

import Navbar from '../components/navBar/NavBar';
import MyStuff from '../components/myStuff/MyStuff';
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import AllStuff from '../components/allStuff/AllStuff';
import fbConnection from '../firebaseRequests/connection';
fbConnection();

const PrivateRoute = ({ component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: {from: props.location}}}
          />
        )
      }
    />
  );
};

const PublicRoute = ({ component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/allStuff', state: {from: props.location}}}
          />
        )
      }
    />
  );
};

class App extends Component
{
    state=
    {
      authed: false,
    }

    componentDidMount () {
      this.removeListener = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({authed: true});
        } else {
          this.setState({authed: false});
        }
      });
    }

    componentWillUnmount () {
      this.removeListener();
    }

    runAway = () => {
      this.setState({authed: false});
    }

    render ()
    {
      return (
        <div className="App">
          <BrowserRouter>
            <div>
              <Navbar
                authed={this.state.authed}
                runAway={this.runAway}
              />
              <div className="container">
                <div className="row">
                  <Switch>
                    <Route path="/" exact component={MyStuff}/>
                    <PrivateRoute
                      path="/myStuff"
                      authed={this.state.authed}
                      component={MyStuff}
                    />
                    <PublicRoute
                      path="/register"
                      authed={this.state.authed}
                      component={Register}
                    />
                    <PublicRoute
                      path="/login"
                      authed={this.state.authed}
                      component={Login}
                    />
                    <PrivateRoute
                      path="/allStuff"
                      authed={this.state.authed}
                      component={AllStuff}
                    />
                  </Switch>
                </div>
              </div>
            </div>
          </BrowserRouter>
        </div>
      );
    }
}

export default App;
