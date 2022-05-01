import React, { Component } from "react";
import { Link } from "react-router-dom";

class SignUpForm extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      is_student: false,
      is_alumni: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log("The form was submitted with the following data:");
    if (this.state.is_alumni === true){
      fetch("http://localhost:5000/alumni/register", {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ first_name: this.state.first_name, last_name: this.state.last_name, email: this.state.email, password: this.state.password })
    }).then((response) => {
      if (response.status === 200){
        alert('Alumni added successfully!')
      }
      else{
        alert('Alumni with this email already exists.')
      }
    })
    }
    else {
      fetch("http://localhost:5000/student/register", {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ first_name: this.state.first_name, last_name: this.state.last_name, email: this.state.email, password: this.state.password })
    }).then((response) => {
      if (response.status === 200){
        alert('Student added successfully!')
      }
      else{
        alert('Student with this email already exists.')
      }
    })
    }
  }

  render() {
    return (
      <div className="formCenter">
        <form onSubmit={this.handleSubmit} className="formFields">
          <div className="formField">
            <label className="formFieldLabel" htmlFor="first_name">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              className="formFieldInput"
              placeholder="Enter your first name"
              name="first_name"
              value={this.state.first_name}
              onChange={this.handleChange}
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="last_name">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              className="formFieldInput"
              placeholder="Enter your last name"
              name="last_name"
              value={this.state.last_name}
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
            <label className="formFieldLabel" htmlFor="email">
              E-Mail 
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
            <label className="formFieldCheckboxLabel">
              <input
                className="formFieldCheckbox"
                type="checkbox"
                name="is_student"
                value={this.state.is_student}
                onChange={this.handleChange}
              />{" "}
              SignUp as Student
              <a href="null" className="formFieldTermsLink">
              </a>
            </label>
          </div>

          <div className="formField">
            <label className="formFieldCheckboxLabel">
              <input
                className="formFieldCheckbox"
                type="checkbox"
                name="is_alumni"
                value={this.state.is_alumni}
                onChange={this.handleChange}
              />{" "}
              SignUp as Alumni
              <a href="null" className="formFieldTermsLink">
              </a>
            </label>
          </div>

          <div className="formField">
            <button className="formFieldButton">Sign Up</button>{" "}
            <Link to="/sign-in" className="formFieldLink">
              I'm already member
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
export default SignUpForm;
