import React from "react";
import SignupForm from "../../components/SignupForm/SignupForm";
import "./SignupPage.css";

function SignupPage() {
  const [message, setMessage] = React.useState("");

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  return (
    <div className="signup-page">
      <div className="signup-title">
        <h2>Sign up</h2>
      </div>

      <div>
        <SignupForm updateMessage={updateMessage} />
      </div>

      <div className="signup-error-msg-container">
        {message.length !== 0 ? (
          <div className="signup-error-msg">
            <div>
              <p className="err"> Oops! {message}.</p>
            </div>

            <div className="err-info">
              <p>Please check:</p>
              <p>Your username and email are unique</p>
              <p>Your password is secure:</p>
              <ul className="err-list">
                <li>
                  Your password isn't too similar to your other personal
                  information
                </li>
                <li>Your password contains at least 8 characters</li>
                <li>Your password isn't common</li>
                <li>Your password isn't just numbers</li>
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SignupPage;
