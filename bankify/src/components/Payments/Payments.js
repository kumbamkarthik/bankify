import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Payments.css";

const Payments = () => {
  const [accounts, setAccounts] = useState([
    {
      id: 152,
      email: "leo@gmail.com",
      bankType: "BANK1",
      isActivated: 1,
    },
    {
      id: 153,
      email: "leo@gmail.com",
      bankType: "BANK2",
      isActivated: 1,
    },
  ]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  // Fetch user data and accounts on component mount
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        fetchUserAccounts(parsedUser.email);
      } catch (error) {
        console.error("Error parsing user data:", error);
        setError("Error loading user data");
      }
    } else {
      setError("Please log in to view your accounts");
    }
  }, []);

  // Fetch user's bank accounts
  const fetchUserAccounts = async (email) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8081/account/getAccounts?email=${email}`
      );

      if (response.data && Array.isArray(response.data)) {
        setAccounts(response.data);
        setError("");
      } else {
        setError("No accounts found");
      }
    } catch (err) {
      console.error("Error fetching accounts:", err);
      setError("Failed to load your accounts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Check balance for selected account
  const checkBalance = async () => {
    if (!selectedAccount) {
      setError("Please select an account");
      return;
    }

    setLoading(true);
    setError("");
    setBalance(null);

    try {
      const url = "";
      if(selectedAccount === "BANK1"){
        url = "http://localhost:8082/"+selectedAccount+"/getBalance/"+user.email;
      }else if(selectedAccount === "BANK2"){
        url = "http://localhost:8083/"+selectedAccount+"/getBalance/"+user.email;
      }
      // Replace with your actual API endpoint
      const response = await axios.get(url);

      if (response.data) {
        setBalance(response.data);
      } else {
        setError("Could not retrieve balance information");
      }
    } catch (err) {
      console.error("Error checking balance:", err);
      setError("Failed to check balance. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payments-container">
      <div className="payments-card">
        <h2>Account Balance</h2>

        {!user && (
          <div className="login-message">
            Please log in to view your accounts
          </div>
        )}

        {user && (
          <>
            <div className="form-group">
              <label htmlFor="account-select">Select Bank Account:</label>
              <select
                id="account-select"
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                disabled={loading || accounts.length === 0}
              >
                <option value="">-- Select an account --</option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.bankType}>
                    {account.bankType}{" "}
                    {account.isActivated ? "(Active)" : "(Pending)"}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="check-balance-button"
              onClick={checkBalance}
              disabled={loading || !selectedAccount}
            >
              {loading ? "Checking..." : "Check Balance"}
            </button>

            {error && <div className="error-message">{error}</div>}

            {balance !== null && (
              <div className="balance-display">
                <h3>Current Balance</h3>
                <div className="balance-amount">${balance.toFixed(2)}</div>
                <div className="last-updated">
                  Last updated: {new Date().toLocaleDateString()} at{" "}
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
            )}

            {accounts.length === 0 && !loading && !error && (
              <div className="no-accounts-message">
                You don't have any bank accounts connected. Please add a bank
                account first.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Payments;
