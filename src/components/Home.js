import React, { Component } from "react";
import {
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Nav,
} from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import Contact from "./Contact";
// import Home from './Home'
import About from "./About";
import Referral from "./Referral";
import Help from "./Help";

const pendingRequests = (event) => {

  fetch("http://localhost:5000/student/requests", {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_approved: false })
    }).then((response) => {
      console.log(response)
      }
    )
};

const acceptedRequests = (event) => {

  fetch("http://localhost:5000/student/requests", {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_approved: true })
    }).then((response) => {
      console.log(response.student_id)
      }
    )
};

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
export default class Home extends Component {
  render() {
    return (
      <Column>
        <div>
          <Navbar bg="dark" variant={"dark"} expand="lg">
            <Navbar.Brand href="#">alumConnect</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="mr-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link as={Link} onClick={pendingRequests} to="/pendingRequests">
                  Pending Requests
                </Nav.Link>
                <Nav.Link as={Link} onClick={acceptedRequests} to="/acceptedRequests">
                  Accepted Requests
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <div>
          <Routes>
            <Route path="/pendingRequests" element={<About />} />
            <Route path="/acceptedRequests" element={<About />} />
          </Routes>
        </div>
      </Column>
    );
  }
}
