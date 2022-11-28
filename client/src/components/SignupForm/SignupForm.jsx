import React from "react";
import { Link, useNavigate } from "react-router-dom";
import userService from "../../utils/userService";
import useUser from "../../hooks/useUser";
import "./SignupForm.css";

function SignupForm({ updateMessage }) {
  const navigate = useNavigate();
  const { handleSignupOrLogin } = useUser();

  const [state, setState] = React.useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    updateMessage("");
    setState((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.signup(state);
      // Let <App> know a user has signed up!
      handleSignupOrLogin();
      navigate("/dashboard");
    } catch (err) {
      // Invalid user data (probably duplicate email)
      updateMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(
      state.name &&
      state.username &&
      state.email &&
      state.password === state.password_confirmation
    );
  };

  return (
    <div className="signup">
      <div className="signup-form-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="name-section">
            <input
              type="text"
              placeholder="Name*"
              value={state.name}
              name="name"
              onChange={handleChange}
              className="signup-input"
            />
          </div>

          <div className="username-section">
            <input
              type="text"
              placeholder="Username*"
              value={state.username}
              name="username"
              onChange={handleChange}
              className="signup-input"
            />
          </div>

          <div className="email--section">
            <input
              type="email"
              placeholder="Email*"
              value={state.email}
              name="email"
              onChange={handleChange}
              className="signup-input"
            />
          </div>

          <div className="pw-section">
            <input
              type="password"
              placeholder="Password*"
              value={state.password}
              name="password"
              onChange={handleChange}
              className="signup-input"
            />
          </div>
          <div className="pw-conf-section">
            <input
              type="password"
              placeholder="Confirm Password*"
              value={state.password_confirmation}
              name="password_confirmation"
              onChange={handleChange}
              className="signup-input"
            />
          </div>

          <div className="signup-action">
            <div className="signup-btn-container">
              <button className="signup-btn" disabled={isFormInvalid()}>
                Sign Up
              </button>
            </div>

            <div className="cancel-link">
              <Link to="/" style={{ textDecoration: "none", color: "#bebebe" }}>
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
