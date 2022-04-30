import React, { Component } from 'react'
import { Navbar, NavDropdown, Form, FormControl, Button, Nav } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

import Home from './Home';
import Contact from './Contact';
import About from './About'
import Referral from './Referral'
import Help from './Help'

const handleclick = (event) => {
  fetch("http://localhost:5000/alumni/searchEmployees")
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result)
      },

      (error) => {
        console.log(error)
      }
    )
}

export default class NavbarComp extends Component {
    render() {
        return (
            <Router>
                <div>

                    <Navbar bg="dark" variant={"dark"} expand="lg">
                        <Navbar.Brand href="#">alumConnect</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="mr-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                                <Nav.Link as={Link} to="/about">About</Nav.Link>
                                <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                                <Nav.Link as={Link} to="/help">Seek Help</Nav.Link>
                                <Nav.Link as={Link} onClick = {handleclick} to="/referral">Ask for a Referral</Nav.Link>

                            </Nav>

                        </Navbar.Collapse>
                    </Navbar>
                </div>
                <div>
                    <Routes>
                    <Route path='/home' element={<Home/>} />
                    <Route path='/about' element={<About/>} />
                    <Route path='/contact' element={<Contact/>} />
                    <Route path='/referral' element={<Referral/>} />
                    <Route path='/help' element={<Help/>} />
                    </Routes>
                </div>
            </Router>
        )
    }
}
