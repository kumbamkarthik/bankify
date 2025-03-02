import React, { useState, useEffect } from "react";
import axios from "axios";
import "./userAccounts.css";

const UserAccounts = () => {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Add user email state (in a real app, you might get this from context or localStorage)
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    try {
      // Get user data from localStorage
      const userData = localStorage.getItem("user");
      console.log(userData);
      if (userData) {
        // Parse the JSON string to get the user object
        const user = JSON.parse(userData);

        // Extract email from the user object
        if (user && user.email) {
          setUserEmail(user.email);
          console.log("User email loaded from localStorage:", user.email);
        } else {
          console.log("No email found in user data");
        }
      } else {
        console.log("No user data found in localStorage");
        // For testing purposes only - remove in production
        // setUserEmail("test@example.com");
      }
    } catch (error) {
      console.error("Error accessing user data from localStorage:", error);
    }
  }, []);
  // Available bank options with added colors and icons
  const bankOptions = [
    { id: "BANK1", name: "BANK1", color: "#1e88e5", icon: "🏦" },
    { id: "BANK2", name: "BANK2", color: "#43a047", icon: "💰" },
    { id: "BANK3", name: "BANK3", color: "#e53935", icon: "💳" },
    { id: "BANK4", name: "BANK4", color: "#8e24aa", icon: "🔐" },
  ];

  // Toggle the add account form with animation
  const toggleAddAccount = () => {
    setIsAddingAccount(!isAddingAccount);
    setSelectedBank("");
    setError("");
    setSuccessMessage("");
  };

  // Handle bank selection
  const handleBankChange = (e) => {
    setSelectedBank(e.target.value);
    setError("");
  };

  // Add the selected bank account with API call
  const handleAddAccount = async () => {
    if (!selectedBank) {
      setError("Please select a bank");
      return;
    }

    if (!userEmail) {
      setError("Please log in to connect your bank accounts");
      return;
    }

    // Check if the bank is already added
    if (bankAccounts.some((account) => account.id === selectedBank)) {
      setError("This bank account is already connected");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Prepare the request data
      const requestData = {
        email: userEmail,
        bankType: selectedBank, // Using the bank ID as the bankType
      };

      console.log("Sending request:", requestData);

      const response = await axios.post(
        "http://localhost:8081/account/link",
        requestData
      );

      console.log("Received response:", response.data);

      if (response.data && response.data.isSuccess) {
        // Find the selected bank from options for UI details
        setSuccessMessage("Bank account linked successfully!");

        // Find the selected bank from options for UI details
        const bankInfo = bankOptions.find((bank) => bank.id === selectedBank);

        // Fetch all user accounts after successful linking
        fetchUserAccounts();

        // Close the add account form
        setTimeout(() => {
          setIsAddingAccount(false);
          setSelectedBank("");
        }, 1500);
      } else {
        // Handle unsuccessful response
        setError(
          //   response.data.message ||
          "Failed to connect bank account. Please try again."
        );
      }
    } catch (err) {
      console.error("Error connecting bank account:", err);
      setError(
        "Failed to connect to the bank. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };
  const fetchUserAccounts = async () => {
    if (!userEmail) {
      console.log("No user email available to fetch accounts");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8081/account/getAccounts?email=${encodeURIComponent(
          userEmail
        )}`
      );

      console.log("User accounts fetched:", response.data);
      if (response.data && Array.isArray(response.data)) {
        // Transform the API response into our UI-friendly format
        const formattedAccounts = response.data.map((account) => {
          // Find the bank info from our bankOptions array
          const bankInfo = bankOptions.find(
            (bank) => bank.id === account.bankType
          ) || {
            name: account.bankType,
            color: "#cccccc",
            icon: "🏦",
          };

          return {
            id: account.id,
            email: account.email,
            bankType: account.bankType,
            isActivated: account.isActivated,
            // Add UI details from our bankOptions
            name: bankInfo.name,
            color: bankInfo.color,
            icon: bankInfo.icon,
            // Add a masked account number for display
            accountNumber: `xxxx-xxxx-${Math.floor(
              1000 + Math.random() * 9000
            )}`,
          };
        });

        setBankAccounts(formattedAccounts);
      } else {
        console.error("Invalid response format from accounts API");
      }
    } catch (err) {
      console.error("Error fetching user accounts:", err);
      setError("Failed to load your bank accounts. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="user-accounts-container">
      <div className="accounts-header">
        <div className="header-left">
          <div className="header-icon">💼</div>
          <h2>Your Bank Accounts</h2>
        </div>
        <button
          className="add-button pulse-animation"
          onClick={toggleAddAccount}
          disabled={isLoading}
        >
          {isAddingAccount ? "× Cancel" : "+ Add Account"}
        </button>
      </div>

      {/* Success message */}
      {successMessage && (
        <div className="success-message fade-in">
          <span className="success-icon">✓</span> {successMessage}
        </div>
      )}

      {/* Add Account Form */}
      {isAddingAccount && (
        <div className="add-account-form slide-in">
          <h3>Connect a new bank account</h3>
          <p className="form-description">
            Select your bank to securely connect your account details
          </p>

          <div className="form-group">
            <label htmlFor="bank-select">Select Bank</label>
            <div className="select-wrapper">
              <select
                id="bank-select"
                value={selectedBank}
                onChange={handleBankChange}
                className="bank-select"
              >
                <option value="">-- Select a Bank --</option>
                {bankOptions.map((bank) => (
                  <option key={bank.id} value={bank.id}>
                    {bank.icon} {bank.name}
                  </option>
                ))}
              </select>
              <div className="select-arrow"></div>
            </div>
          </div>

          {error && (
            <div className="error-message fade-in">
              <span className="error-icon">!</span> {error}
            </div>
          )}

          <div className="form-actions">
            <button
              className="submit-button"
              onClick={handleAddAccount}
              disabled={!selectedBank || isLoading}
            >
              {isLoading ? (
                <div className="loading-spinner"></div>
              ) : (
                "Connect Bank"
              )}
            </button>
          </div>
        </div>
      )}

      {/* Bank Accounts List */}
      <div className="accounts-container">
        {bankAccounts.length > 0 ? (
          <div className="accounts-list">
            <h1>Bank Accounts</h1>
          </div>
        ) : (
          <div className="no-accounts fade-in">
            <div className="no-accounts-graphic">
              <div className="no-accounts-icon">🏦</div>
              <div className="no-accounts-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <h3>No Bank Accounts Found</h3>
            <p>
              Connect your bank accounts to manage all your finances in one
              place
            </p>
            <button className="add-first-account" onClick={toggleAddAccount}>
              + Add Your First Bank Account
            </button>
          </div>
        )}
      </div>

      {/* Add a login notice if no email is set */}
      {!userEmail && (
        <div className="login-notice fade-in">
          <span className="notice-icon">ℹ️</span>
          <div className="notice-content">
            <h4>Login Required</h4>
            <p>Please log in to connect and manage your bank accounts</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAccounts;
