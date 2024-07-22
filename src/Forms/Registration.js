import React, { useState } from "react";
import axios from "axios";
import "./Registration.css";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [singnupData, setSignupData] = useState({
    username: "",
    password: "",
    accountNumber: "",
    branch: "",
    phoneNumber: "",
  });
  console.log(singnupData);
  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/signup", singnupData);
      console.log("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.error("Signup failed", error);
    }
  };
  const handleClear = () => {
    setSignupData({
      username: "",
      password: "",
      accountNumber: "",
      branch: "",
      phoneNumber: "",
    });
  };
  return (
    <div className="signup-container">
      <div className="image-signup-container"></div>
      <div className="signup-text">
        <div>
          <h1 className="home-heading">VARSHITH BANK</h1>
        </div>
        <form onSubmit={handleSignup}>
          <div>
            <label>USERNAME : </label>
            <input
              type="text"
              value={singnupData.username}
              onChange={(event) =>
                setSignupData({ ...singnupData, username: event.target.value })
              }
              required
            />
          </div>
          <div>
            <label>PASSWORD : </label>
            <input
              type="password"
              value={singnupData.password}
              onChange={(event) =>
                setSignupData({ ...singnupData, password: event.target.value })
              }
              maxLength={8}
              required
            />
          </div>
          <div>
            <label>ACCOUNT NUMBER : </label>
            <input
              type="number"
              value={singnupData.accountNumber}
              onChange={(event) => {
                if (event.target.value.length <= 14) {
                  setSignupData({
                    ...singnupData,
                    accountNumber: event.target.value,
                  });
                }
              }}
              required
            />
          </div>
          <div>
            <label>BRANCH : </label>
            <input
              type="text"
              value={singnupData.branch}
              onChange={(event) =>
                setSignupData({ ...singnupData, branch: event.target.value })
              }
              required
            />
          </div>
          <div>
            <label>PHONE NUMBER : </label>
            <input
              type="number"
              value={singnupData.phoneNumber}
              onChange={(event) => {
                if (event.target.value.length <= 10) {
                  setSignupData({
                    ...singnupData,
                    phoneNumber: event.target.value,
                  });
                }
              }}
              required
            />
          </div>
          <div>
            <button type="submit">SIGN UP</button>
            <button type="submit" onClick={handleClear}>
              CLEAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
