// import React, { Component } from "react";
// import { HashRouter as Router, Route, NavLink } from "react-router-dom";
// import SignUpForm from "./components/SignUpForm";
// import SignInForm from "./components/SignInForm";
//
// import 'bootstrap/dist/css/bootstrap.min.css';
//
// import "./App.css";
//
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//       hello
//       </div>
//       // <Router basename="/react-auth-ui/">
//       //   <div className="App">
//       //     <div className="appAside" />
//       //     <div className="appForm">
//       //       <div className="pageSwitcher">
//       //         <NavLink
//       //           to="/sign-in"
//       //           activeClassName="pageSwitcherItem-active"
//       //           className="pageSwitcherItem"
//       //         >
//       //           Sign In
//       //         </NavLink>
//       //         <NavLink
//       //           exact
//       //           to="/"
//       //           activeClassName="pageSwitcherItem-active"
//       //           className="pageSwitcherItem"
//       //         >
//       //           Sign Up
//       //         </NavLink>
//       //       </div>
//       //
//       //       <div className="formTitle">
//       //         <NavLink
//       //           to="/sign-in"
//       //           activeClassName="formTitleLink-active"
//       //           className="formTitleLink"
//       //         >
//       //           Sign In
//       //         </NavLink>{" "}
//       //         or{" "}
//       //         <NavLink
//       //           exact
//       //           to="/"
//       //           activeClassName="formTitleLink-active"
//       //           className="formTitleLink"
//       //         >
//       //           Sign Up
//       //         </NavLink>
//       //       </div>
//       //
//       //       <Route exact path="/" component={SignUpForm} />
//       //       <Route path="/sign-in" component={SignInForm} />
//       //     </div>
//       //   </div>
//       // </Router>
//     );
//   }
// }
//
// export default App;

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "./components/NavbarComp";
import SearchEmployees from "./components/SearchEmployees";
import Login from "./components/Login";
import SearchBar from "./components/SearchBar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import SignInForm from "./components/SignInForm";
import CompanyData from "./Data.json";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/referral" element={<SearchBar />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/sign-in" element={<SignInForm />} />
        <Route exact path="/dashboard" element={<NavbarComp />}></Route>
        <Route exact path="/" element={<Login />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

