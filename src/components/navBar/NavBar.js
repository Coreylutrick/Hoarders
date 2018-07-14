import React from 'react';
import {Link} from 'react-router-dom';

import authRequests from  '../../firebaseRequests/auth';

import './NavBar.css';

class Navbar extends React.Component {
  render () {
    const {authed, runAway} = this.props;
    const logoutClickEvent = () => {
      authRequests.logoutUser();
      runAway();
    };

    return (
      <div className="Navbar">
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link  to="/allStuff" className="navbar-brand">Hoarder</Link>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              {
                authed ? (
                  <ul className="nav navbar-nav navbar-right">
                    <li>
                      <Link to="/allStuff">All Stuff</Link>
                    </li>
                    <li>
                      <Link to="/myStuff">My Stuff</Link>
                    </li>
                    <li className="navbar-form">
                      <button
                        onClick={logoutClickEvent}
                        className="btn btn-danger"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                ) : (
                  <ul className="nav navbar-nav navbar-right">
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                  </ul>
                )
              }
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
