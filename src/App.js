import "./App.css";
import Login from "./Forms/Login";
//import Registration from "./Forms/Registration";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Registration from "./Forms/Registration";
import AccountDetails from "./Forms/AccountDetails";
import { useState } from "react";
import DepositForm from "./Forms/DepositForm";
import WithdrawalForm from "./Forms/WithdrawalForm";

// App.js
function App() {
  const [customer, setCustomer] = useState();
  const [updatedBalance, setUpdatedBalance] = useState(0);

  const updateBalance = (newBalance) => {
    setUpdatedBalance(newBalance);
  };

  const updateCustomer = (userData) => {
    setCustomer(userData);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {!customer ? (
              <>
                <li>
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link className="nav-link" to="/accountdetails">
                    Account Details
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/deposit">
                    Deposit
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/withdraw">
                    Withdraw
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login updateCustomer={updateCustomer} />}
          />
          <Route path="/register" element={<Registration />} />
          <Route
            path="/accountdetails"
            element={
              <AccountDetails
                customer={customer}
                updatedBalance={updatedBalance}
              />
            }
          />
          <Route
            path="/deposit"
            element={
              <DepositForm customer={customer} updateBalance={updateBalance} />
            }
          />
          <Route
            path="/withdraw"
            element={
              <WithdrawalForm
                customer={customer}
                updateBalance={updateBalance}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
