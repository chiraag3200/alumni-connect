import React, { Component } from "react";
import { HashRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

import "./Login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      currentState: "signin",
    };
  }
  render() {
    return (
      <div basename="/react-auth-ui/">
        <div className="Login">
          <div className="appAside" />
          <div className="appForm">
            <div className="pageSwitcher">
              <div
                onClick={() => {
                  this.setState({ currentState: "signup" });
                  this.props.history.replace("/signup");
                }}
                activeClassName="pageSwitcherItem-active"
                className="pageSwitcherItem hover:bg-white"
              >
                Sign In
              </div>
              <div
                onClick={() => {
                  this.setState({ currentState: "signin" });
                  this.props.history.replace("/signin");
                }}
                activeClassName="pageSwitcherItem-active"
                className="pageSwitcherItem hover:bg-white"
              >
                Sign Up
              </div>
            </div>

            <div className="formTitle">
              <NavLink
                to="/sign-in"
                activeClassName="formTitleLink-active"
                className="formTitleLink"
              >
                Sign In
              </NavLink>{" "}
              or{" "}
              <NavLink
                exact
                to="/"
                activeClassName="formTitleLink-active"
                className="formTitleLink"
              >
                Sign Up
              </NavLink>
            </div>

            {this.state.currentState === "signin" ? (
              <SignInForm />
            ) : (
              <SignUpForm />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
