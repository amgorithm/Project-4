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
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.login(formState);
      handleSignupOrLogin();
      navigate("/dashboard");
    } catch (err) {
      setMessage(
        "Hmm. Your email and password do not match our records. Check again, please."
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-title">
        <h2>Log in</h2>
      </div>

      <form className="login-form-container" onSubmit={handleSubmit}>
        <div className="email-section">
          <input
            type="email"
            placeholder="Email*"
            value={formState.email}
            name="email"
            onChange={handleChange}
            className="login-input"
          />
        </div>

        <div className="pw-section">
          <input
            type="password"
            placeholder="Password*"
            value={formState.password}
            name="password"
            onChange={handleChange}
            className="login-input"
          />
        </div>

        <div className="login-action">
          <div className="login-btn-container">
            <button className="login-btn">Log In</button>
          </div>
          <div className="cancel-link">
            <Link to="/" style={{ textDecoration: "none", color: "#bebebe" }}>
              Cancel
            </Link>
          </div>
        </div>
      </form>
      <div className="err login-err">
        {message.length !== 0 ? <p>{message}</p> : null}
      </div>
    </div>
  );
}

export default LoginPage;
