// DepositForm.js
import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import "./DepositForm.css";

const DepositForm = ({ customer, updateBalance }) => {
  const [depositData, setDepositData] = useState({
    username: customer.username,
    accountNumber: customer.accountNumber,
    date: "",
    depositeAmount: "",
    depositType: "",
  });

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(newDate)) {
      console.error("Invalid date format:", newDate);
      return;
    }
    setDepositData({ ...depositData, date: newDate });
  };

  const handleDeposit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/deposited",
        depositData
      );
      updateBalance(response.data.balance);
      swal({
        title: "Deposit Successful!",
        text: `Amount Deposited : ${depositData.depositeAmount}`,
        icon: "success",
      });
    } catch (error) {
      console.error("Deposit Failed", error);
    }
  };

  const handleClear = () => {
    setDepositData({
      date: "",
      depositeAmount: "",
      depositType: "",
    });
  };

  return (
    <div className="Deposit-container">
      <div className="image-deposit-container"></div>
      <div className="text-deposit-container">
        <div>
          <h1 className="home-heading">VARSHITH BANK</h1>
        </div>
        <form onSubmit={handleDeposit}>
          <div>
            <h2>Deposit Form</h2>
          </div>
          <div>
            <p>
              USERNAME :{" "}
              <span
                style={{ color: "red", fontWeight: "600", fontSize: "24px" }}
              >
                {customer.username}
              </span>{" "}
            </p>
            <p>
              ACCOUNT NUMBER :{" "}
              <span
                style={{ color: "red", fontWeight: "600", fontSize: "24px" }}
              >
                {customer.accountNumber}
              </span>{" "}
            </p>
          </div>

          <div>
            <label>DATE : </label>
            <input
              type="date"
              value={depositData.date}
              onChange={handleDateChange}
              required
            />
          </div>
          <div>
            <label>DEPOSIT AMOUNT : </label>
            <input
              type="number"
              value={depositData.depositeAmount}
              onChange={(event) =>
                setDepositData({
                  ...depositData,
                  depositeAmount: event.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <label>DEPOSIT TYPE : </label>
            <input
              type="text"
              value={depositData.depositType}
              onChange={(event) =>
                setDepositData({
                  ...depositData,
                  depositType: event.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <button type="submit">Deposit</button>
            <button onClick={handleClear}>Clear</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepositForm;
