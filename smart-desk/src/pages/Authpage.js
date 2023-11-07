import React, { useState } from "react";
import LoginForm from "../components/Login";
import SignupForm from "../components/Signup";
import Particle from "../components/Particles";
import Authcss from "./Auth.module.css";

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className={Authcss["home-page"]}>
      <Particle />
      <div
        className={`${Authcss.container} ${
          isSignUp ? Authcss["right-panel-active"] : ""
        }`}
      >
        {isSignUp ? (
          <SignupForm toggleForm={toggleForm} />
        ) : (
          <LoginForm toggleForm={toggleForm} />
        )}
        <div className={Authcss["lay-container"]}>
          <div className={Authcss["lay"]}>
            <div className={Authcss["lay-left"]}>
              <h1>Welcome back</h1>
              <p>
                "Smart Desk: Your All-in-One Productivity Hub - Where Todos,
                News, Weather, and Notes Come Together!" SignUp for Free
              </p>
              <button
                className={Authcss["home-button"]}
                id="signIn"
                onClick={toggleForm}
              >
                Sign In
              </button>
            </div>

            <div className={Authcss["lay-right"]}>
              <h1>Hello Friends</h1>
              <p>
                "Smart Desk: Your All-in-One Productivity Hub - Where Todos,
                News, Weather, and Notes Come Together!" SignUp for Free
              </p>
              <button
                className={Authcss["home-button"]}
                id="signUp"
                onClick={toggleForm}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
