import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = ({ updateCustomer }) => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/login",
        loginData
      );
      navigate("/accountdetails");
      updateCustomer(response.data.customer);
    } catch (error) {
      console.error("Login failed", error);
      setLoginError("Invalid username or password . Please try again");
    }
    console.log(loginData);
  };

  const handleClear = () => {
    setLoginData({
      username: "",
      password: "",
    });
  };

  return (
    <div className="login-container">
      <div className="image-login-container"></div>
      <div className="text-login-container">
        <div>
          <h1 className="home-heading">VARSHITH BANK</h1>
        </div>
        <form onSubmit={handleLogin}>
          <div>
            <label>USERNAME : </label>
            <input
              type="text"
              value={loginData.username}
              onChange={(event) =>
                setLoginData({ ...loginData, username: event.target.value })
              }
              required
            />
          </div>
          <div>
            <label>PASSWORD : </label>
            <input
              type="password"
              value={loginData.password}
              onChange={(event) =>
                setLoginData({ ...loginData, password: event.target.value })
              }
              maxLength={8}
              required
            />
          </div>
          <div>
            <h3 className="error-msg">{loginError}</h3>
            <button type="submit">LOG IN</button>
            <button onClick={handleClear}>CLEAR</button>
          </div>
        </form>
        <p>Welcome back! Log in to manage your finances securely. </p>
        <p> If you're new here, sign up for an account to get started. </p>
        <p>Explore our features to make the most of your banking experience.</p>
        <p>We prioritize your security.</p>
        <p>Rest assured, your data is safe with us.</p>
        <p>24/7 customer support is available. Contact us for assistance.</p>
      </div>
    </div>
  );
};

export default Login;
