import React, { useState } from "react";
import logincss from "../pages/Auth.module.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://smart-desk-mern.vercel.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.authToken);
      console.log(json.authToken);
      window.alert("logged in successfully", "success");
      navigate("/dashboard");
    } else {
      window.alert("invalid credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className={logincss["sign-in"]}>
      <form method="POST" className={logincss["form"]}>
        <h1>Sign In</h1>
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="off"
          value={credentials.email}
          onChange={onChange}
          placeholder="Your Email"
        />
        <input
          type="password"
          name="password"
          id="password"
          autoComplete="off"
          value={credentials.password}
          onChange={onChange}
          placeholder="Your Password"
        />
        {/* <Link to="">Forget your password</Link> */}
        <button className={logincss["home-button"]} onClick={handleSubmit}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
