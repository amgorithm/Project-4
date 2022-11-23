import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import userService from "../../utils/userService";
import useUser from "../../hooks/useUser";

function LoginPage() {
  const navigate = useNavigate();
  const { handleSignupOrLogin } = useUser();

  const [formState, setFormState] = React.useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormState({
      ...formState,
      // Using ES2015 Computed Property Names
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.login(formState);
      // Let <App> know a user has signed up!
      handleSignupOrLogin();
      navigate("/dashboard");
    } catch (err) {
      // alert("Invalid Credentials!");
      setMessage(
        "The email and password you entered did not match our records. Please double-check and try again."
      );
    }
  };

  return (
    <div className="LoginPage">
      <header className="header-footer">Log In</header>
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="col-sm-12">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={formState.email}
              name="email"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={formState.password}
              name="password"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12 text-center">
            <button className="btn btn-default">Log In</button>
            &nbsp;&nbsp;&nbsp;
            <Link to="/">Cancel</Link>
          </div>
        </div>
      </form>

      {message.length !== 0 ? <p>{message}</p> : null}
    </div>
  );
}

export default LoginPage;
