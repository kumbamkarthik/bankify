import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./userAccounts.css";
import AppContext from "../../AppContext";

const UserAccounts = () => {
  const [bankAccounts, setBankAccounts] = useState([    {
    "id": 152,
    "email": "leo@gmail.com",
    "bankType": "BANK1",
    "isActivated": 1
},
{
    "id": 153,
    "email": "leo@gmail.com",
    "bankType": "BANK2",
    "isActivated": 1
}]);
  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Add user email state (in a real app, you might get this from context or localStorage)
  const [userEmail, setUserEmail] = useState("");
  const {accounts,setAccounts}= useContext(AppContext);

  useEffect(() => {
    try {
      // Get user data from localStorage
      const userData = localStorage.getItem("user");
      console.log(userData);
      if (userData) {
        // Parse the JSON string to get the user object
        const user = JSON.parse(userData);
        
        fetchUserAccounts();

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

      if ( response.data && response.data.isSuccess) {
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
      } else if(response.status==400){
        setError("Account already exists");
      }
        else {
        // Handle unsuccessful response
        setError(
          //   response.data.message ||
          "Failed to connect bank account. Please try again."
        );
      }
    } catch (err) {
      console.error("Error connecting bank account:", err);
      setError(
        "Account already exists"
      );
    } finally {
      setIsLoading(false);
    }
  };
  const fetchUserAccounts = async () => {
    // if (!userEmail) {
    //   console.log("No user email available to fetch accounts");
    //   return;
    // }

    const url =
      "http://localhost:8081/account/getAccounts?email=" +
      JSON.parse(localStorage.getItem("user")).email;
    try {
      const response = await axios.get(url);

      console.log(response);
      console.log(url);

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
            // name: bankInfo.name,
            // color: bankInfo.color,
            // icon: bankInfo.icon,
            // // Add a masked account number for display
            // accountNumber: `xxxx-xxxx-${Math.floor(
            //   1000 + Math.random() * 9000
            // )}`,
          };
        });
        setAccounts(formattedAccounts);

        setBankAccounts(formattedAccounts);
        console.log(accounts);
      } else if(response.status === 400){
        setError("Account already exists");
      }
      else {
        console.error("Invalid response format from accounts API");
      }
    } catch (err) {
      console.error("Error fetching user accounts:", err);
      setError("Failed to load your bank accounts. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
const onDeleteAccount = async (id) => {
     // Confirm deletion with user
  if (!window.confirm("Are you sure you want to delete this bank account?")) {
    return;
  }

  try {
    // Make API call to delete the account
    const response = await axios.delete(`http://localhost:8081/account/delete?id=${id}`);
    
    console.log("Delete response:", response.data);
    
    if (response.data && response.data.isSuccess) {
      // Remove the account from the local state
      setBankAccounts(bankAccounts.filter(account => account.id !== id));
      
      // Show success message
      setSuccessMessage("Bank account successfully removed");
      
      // Clear success message after a few seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } else {
      // If the API returns an error
      setError(response.data?.message || "Failed to delete bank account. Please try again.");
    }
  } catch (err) {
    console.error("Error deleting bank account:", err);
    setError("An error occurred while deleting the account. Please try again later.");
  } finally {
    setIsLoading(false);
  }
  
  setIsLoading(true);
  setError("");
}
// Helper function to adjust color brightness for gradient effect
const adjustColor = (color, amount) => {
    return '#' + color.replace(/^#/, '').replace(/../g, color => 
      ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).slice(-2)
    );
  };
  
  // Helper function to get appropriate bank icon
  const getBankIcon = (bankType) => {
    switch(bankType) {
      case 'BANK1': return '🏦';
      case 'BANK2': return '💰';
      case 'BANK3': return '💳';
      case 'BANK4': return '🔐';
      default: return '🏦';
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
            <div cl assName="select-wrapper">
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
          <div className="accounts-section">
            <h3 className="section-title">Your Bank Accounts</h3>
            <div className="accounts-list">
            {bankAccounts.map((account) => (
              <div key={account.id} className="bank-card-container">
                <div
                  className="bank-card"
                  style={{
                    background: `linear-gradient(135deg, ${
                      account.color || "#1e88e5"
                    } 0%, ${adjustColor(
                      account.color || "#1e88e5",
                      -30
                    )} 100%)`,
                  }}
                >
                  <div className="bank-card-chip">
                    <span className="chip-icon">💳</span>
                  </div>
                  <div className="bank-card-details">
                    <div className="bank-name">
                      <span className="bank-icon">
                        {getBankIcon(account.bankType)}
                      </span>
                      <h3>{account.bankType}</h3>
                    </div>
                    <div className="card-number">
                      •••• •••• •••• {Math.floor(1000 + Math.random() * 9000)}
                    </div>
                  </div>
                  <div className="bank-card-footer">
                    <div className="card-holder">
                      <span className="label">ACCOUNT HOLDER</span>
                      <span className="value">
                        {account.email?.split("@")[0]?.toUpperCase() ||
                          "CARD HOLDER"}
                      </span>
                    </div>
                    <div className="card-status">
                      <span
                        className={`status-badge ${
                          account.isActivated ? "active" : "inactive"
                        }`}
                      >
                        {account.isActivated ? "ACTIVE" : "PENDING"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bank-card-actions">
                  <button className="action-button delete" onClick={()=>{onDeleteAccount(account.id)}}>Delete</button>
                </div>
              </div>
            ))}
            </div>
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
