// AccountDetails.js
import React from "react";
import "./AccountDetails.css";

const AccountDetails = ({ customer, updatedBalance }) => {
  return (
    <div className="account-container">
      <div className="image-account-container"></div>
      <div className="text-account-container">
        <div>
          <h1 className="home-heading">VARSHITH BANK</h1>
        </div>
        <div>
          <h3 className="side-heading">ACCOUNT DETAILS : </h3>
        </div>
        <p>
          USERNAME :{" "}
          <span style={{ color: "red", fontWeight: "600", fontSize: "24px" }}>
            {customer.username}
          </span>
        </p>
        <p>
          ACCOUNT NUMBER :{" "}
          <span
            span
            style={{ color: "red", fontWeight: "600", fontSize: "24px" }}
          >
            {customer.accountNumber}
          </span>
        </p>
        <p>
          BRANCH :{" "}
          <span style={{ color: "red", fontWeight: "600", fontSize: "24px" }}>
            {customer.branch}
          </span>
        </p>
        <p>
          PHONE NUMBER :{" "}
          <span style={{ color: "red", fontWeight: "600", fontSize: "24px" }}>
            {customer.phoneNumber}
          </span>{" "}
        </p>
        <p>
          AVAILABLE BALANCE :
          <span style={{ color: "green", fontSize: "24px", fontWeight: "600" }}>
            {updatedBalance === 0 ? customer.balance : updatedBalance}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AccountDetails;
