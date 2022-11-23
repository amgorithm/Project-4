import React from "react";
import SignupForm from "../../components/SignupForm/SignupForm";
import "./SignupPage.css";

function SignupPage() {
  const [message, setMessage] = React.useState("");

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  return (
    <div className="SignupPage">
      <SignupForm updateMessage={updateMessage} />

      {message.length !== 0 ? (
        <>
          <p>{message}</p>

          <p>Please check:</p>
          <p>Your username and email are unique</p>
          <p>Your password is secure:</p>
          <ul>
            <li>
              Your password can’t be too similar to your other personal
              information
            </li>
            <li>Your password must contain at least 8 characters</li>
            <li>Your password can’t be a commonly used password</li>
            <li>Your password can’t be entirely numeric.</li>
          </ul>
        </>
      ) : null}
      {/* <p>{message}</p> */}
    </div>
  );
}

export default SignupPage;
