import React, { Component } from "react";
import {
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Nav,
} from "react-bootstrap";
import { StyleSheet, Text, View } from "react-native";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import Contact from "./Contact";
// import Home from './Home'
import About from "./About";
import Referral from "./Referral";
import Help from "./Help";
// import style from 'bootstrap/dist/css/bootstrap.css';


const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      pendingRequests: 0,
      acceptedRequests: 0,
    };
    this.pendingRequests = this.pendingRequests.bind(this);
    this.acceptedRequests = this.acceptedRequests.bind(this);
  }

  pendingRequests(event) {
    fetch("http://localhost:5000/student/requests", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: localStorage.getItem('id'), is_approved: false }),
    }).then((response) => response.json())
    .then((response) => {
      this.setState({ pendingRequests: response });
    });
  }

  acceptedRequests(event) {
    fetch("http://localhost:5000/student/requests", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: localStorage.getItem('id'), is_approved: true }),
    }).then((response) => response.json())
    .then((response) => {
      this.setState({ acceptedRequests: response });
    });
  }

  render() {
    return (
      <Column>
        <div>
          <Navbar bg="dark" variant={"dark"} expand="lg" className="pt-3">
            <Navbar.Brand href="#">alumConnect</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="mr-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <div className="relative mr-5">
                  <span
                    className="bg-white rounded-full absolute px-2"
                    style={{ right: "-20px", top: "-10px" }}
                  >
                    22
                  </span>
                  <Nav.Link
                    as={Link}
                    onClick={this.pendingRequests}
                    to="/pendingRequests"
                  >
                    Pending Requests
                  </Nav.Link>
                </div>
                <div className="relative mr-5">
                  <span
                    className="bg-white rounded-full absolute px-2"
                    style={{ right: "-20px", top: "-10px" }}
                  >
                    20
                  </span>
                  <Nav.Link
                    as={Link}
                    onClick={this.acceptedRequests}
                    to="/acceptedRequests"
                  >
                    Accepted Requests
                  </Nav.Link>
                </div>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <div>
          <Routes>
            <Route exact path="/pendingRequests" element={<About />} />
            <Route path="/acceptedRequests" element={<About />} />
          </Routes>
        </div>
      </Column>
    );
  }
}
