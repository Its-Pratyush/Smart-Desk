import React, { useState } from "react";
import Signupcss from "../pages/Auth.module.css";
import { useNavigate } from "react-router-dom";

const SignupForm = ({ toggleForm }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`smart-desk-mern.vercel.app
/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      navigate("/");
      window.alert("User registered successfully");
    } else {
      window.alert("invalid credentials ");
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className={Signupcss["sign-up"]}>
      <form method="POST" className={Signupcss["form"]}>
        <h1>Create account</h1>
        <div className={Signupcss["social-container"]}>
          {/* <a href="#" className={Signupcss["social"]}>
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className={Signupcss["social"]}>
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className={Signupcss["social"]}>
            <i className="fab fa-facebook-f"></i>
          </a> */}
        </div>
        <input
          type="text"
          name="name"
          id="name"
          autoComplete="off"
          value={user.name}
          onChange={onChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="off"
          value={user.email}
          onChange={onChange}
          placeholder="Email"
        />

        <input
          type="password"
          name="password"
          id="password"
          autoComplete="off"
          value={user.password}
          onChange={onChange}
          placeholder="Password"
        />

        <button
          type="button"
          className={Signupcss["home-button"]}
          onClick={handleSubmit}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
