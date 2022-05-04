import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  FacebookLoginButton,
  InstagramLoginButton,
} from "react-social-login-buttons";
import "./Login.css";
import axios from "axios";
import history from "../History";
class SignInForm extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();


    fetch("http://localhost:5000/student/usertype", {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: this.state.email})
    })
    .then((response) => {
      if (response.status === 400){
         axios.post("http://localhost:5000/student/login", {
          email: this.state.email,
          password: this.state.password
        })
         .then((response) => {
          if(response.status===200){
            localStorage.setItem('id', response.data["_id"])
          }
          else if(response.status===201){
            alert("Any student with this email does not exist.")
          }
          else{
            alert('Invalid Credentials')
          }
        })
      }
      else{
         axios.post("http://localhost:5000/alumni/login", {
          email: this.state.email,
          password: this.state.password
        })
         .then((response) => {
          if(response.status===200){
            localStorage.setItem('id', response.data["_id"])
            alert('success')
          }
          else if(response.status===201){
            alert("Any alumni with this email does not exist.")
          }
          else{
            alert('Invalid Credentials')
          }
        })
      }
      }
    )
  }

  render() {
    return (
      <div className="formCenter">
        <form className="formFields" onSubmit={this.handleSubmit}>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="email">
              E-Mail Address
            </label>
            <input
              type="email"
              id="email"
              className="formFieldInput"
              placeholder="Enter your email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>

          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="formFieldInput"
              placeholder="Enter your password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          

          <div className="formField">
            <button className="formFieldButton">Sign In</button>{" "}
            <Link to="/" className="formFieldLink">
              Create an account
            </Link>
          </div>

          <div className="socialMediaButtons">
            <div className="facebookButton">
              <FacebookLoginButton onClick={() => alert("Hello")} />
            </div>

            <div className="instagramButton">
              <InstagramLoginButton onClick={() => alert("Hello")} />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignInForm;
