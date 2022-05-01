import React, { Component } from "react";
import { HashRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";


import "./Login.css";

class Login extends Component {
  render() {
    return (
      <div basename="/react-auth-ui/">
        <div className="Login">
          <div className="appAside" />
          <div className="appForm">
            <div className="pageSwitcher">
              <NavLink
                to="/sign-in"
                activeClassName="pageSwitcherItem-active"
                className="pageSwitcherItem"
              >
                Sign In
              </NavLink>
              <NavLink
                exact
                to="/"
                activeClassName="pageSwitcherItem-active"
                className="pageSwitcherItem"
              >
                Sign Up
              </NavLink>
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
            <Routes>
            <Route exact path="/" element={<SignUpForm/>} />
            <Route path="/sign-in" element={<SignInForm/>} />
            </Routes>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
