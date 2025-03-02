import React, { useContext, useEffect, useState } from "react";
import "./Banking.css";
import AppContext from "../../AppContext";
import axios from "axios";
const Banking = () => {
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
  const [transactionType, setTransactionType] = useState("withdraw");
  const [selectedBank, setSelectedBank] = useState("");
  const [amount, setAmount] = useState("");
  const [code, setCode] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [vendorInput, setVendorInput] = useState("");
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [vendorBalance, setVendorBalance] = useState(5000); // Mock initial balance
  const { accounts, setAccounts } = useContext(AppContext);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // Get user data from localStorage
    fetchUserAccounts()
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUserRole(parsedUser.role);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  useEffect(() => {
    console.log("Accounts:", accounts);
  }, [accounts]);

  // Banks list
  const banks = [
    { id: "bank1", name: "First National Bank" },
    { id: "bank2", name: "City Trust Bank" },
    { id: "bank3", name: "Coastal Credit Union" },
  ];

  const bankOptions = [
    { id: "BANK1", name: "BANK1", color: "#1e88e5", icon: "🏦" },
    { id: "BANK2", name: "BANK2", color: "#43a047", icon: "💰" },
    { id: "BANK3", name: "BANK3", color: "#e53935", icon: "💳" },
    { id: "BANK4", name: "BANK4", color: "#8e24aa", icon: "🔐" },
  ];
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
  // Generate transaction code
  const generateCode = async () => {
    if (!selectedBank || !amount || amount <= 0) return;
    
    setIsLoading(true);
    setError("");

    try {
      // Get user email from localStorage
      const userData = localStorage.getItem("user");
      const userEmail = userData ? JSON.parse(userData).email : null;
      
      if (!userEmail) {
        setError("User email not found. Please log in again.");
        setIsLoading(false);
        return;
      }

      // Prepare request payload
      const requestData = {
        transactionType: transactionType,
        accountId: selectedBank,
        amount: parseFloat(amount),
        email: userEmail
      };
      
      console.log("Generating code with data:", requestData);
      
      // Make API call to generate transaction code
      const response = await axios.post(
        "http://localhost:8084/requests/addRequest", 
        requestData
      );
      
      console.log("API response:", response.data);
      
      // Check if response contains a code
      if (response.data && response.data.code) {
        setCode(response.data.code);
      } else {
        // If no code in response, generate one locally as fallback
        const prefix = transactionType === "withdraw" ? "W" : "D";
        const bankCode = selectedBank.substring(0, 4);
        const timestamp = Date.now().toString().slice(-6);
        const randomDigits = Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0");

        setCode(`${prefix}-${bankCode}${timestamp}-${randomDigits}`);
        console.warn("Generated code locally as fallback");
      }
    } catch (err) {
      console.error("Error generating transaction code:", err);
      setError("Failed to generate transaction code. Please try again.");
      
      // Optional: Show error details from API if available
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  // For vendors - process payment
  const processTransaction = () => {
    if (!vendorInput.trim()) return;

    // Simple validation and processing logic
    setTransactionStatus("processing");

    // Simulate API call with timeout
    setTimeout(() => {
      // Check if code starts with W or D to determine transaction type
      const isWithdrawal = vendorInput.startsWith("W");
      const isDeposit = vendorInput.startsWith("D");

      // Mock validation - in a real app, this would verify against a database
      const isValid = vendorInput.length > 10;
      if (isValid) {
        // Mock transaction amount - in a real app, this would come from the database
        const transactionAmount = Math.floor(Math.random() * 500) + 50;

        if (isWithdrawal) {
          // Update vendor balance for withdrawal (vendor gives money to user)
          setVendorBalance((prevBalance) => prevBalance - transactionAmount);
          setTransactionStatus({
            success: true,
            message: `Payment of $${transactionAmount} processed successfully`,
            type: "withdrawal",
            amount: transactionAmount,
          });
        } else if (isDeposit) {
          // Update vendor balance for deposit (vendor receives money from user)
          setVendorBalance((prevBalance) => prevBalance + transactionAmount);
          setTransactionStatus({
            success: true,
            message: `Deposit of $${transactionAmount} received successfully`,
            type: "deposit",
            amount: transactionAmount,
          });
        }
      } else {
        setTransactionStatus({
          success: false,
          message: "Invalid transaction code. Please verify and try again.",
        });
      }
      // Reset input field after processing
      setVendorInput("");
    }, 1000);
  };

  // Add this state variable near the top with your other state variables:
const [transactionDetails, setTransactionDetails] = useState(null);

// Then add this new function:
const handleVendorVerify = async () => {
  if (!vendorInput.trim()) return;
  
  setIsLoading(true);
  setError("");
  
  try {
    // Fetch transaction details based on the code
    const response = await axios.get(`http://localhost:8084/requests/${vendorInput}`);
    
    console.log("Transaction details:", response.data);
    
    if (response.data) {
      setTransactionDetails(response.data);
    } else {
      setError("No transaction found with this code.");
    }
  } catch (err) {
    console.error("Error verifying transaction:", err);
    setError(err.response?.data?.message || "Error retrieving transaction details. Please check the code.");
  } finally {
    setIsLoading(false);
  }
};


  // Reset transaction status
  const resetTransaction = () => {
    setTransactionStatus(null);
    setVendorInput("");
    setTransactionDetails(null);
    setError("");
  };

// Replace the handleVendorAction function with this implementation:

const handleVendorAction = async (action) => {
    if (!vendorInput.trim()) return;
    
    setIsLoading(true);
    setError("");
    
    try {
      // First fetch transaction details based on the code
      const response = await axios.get(`http://localhost:8084/requests/${vendorInput}`);
      
      console.log("Transaction details:", response.data);
      
      if (response.data) {
        // If details were successfully retrieved
        if (action === 'accept') {
          // Process acceptance - in a real app, this would call an API
          setTransactionStatus({
            success: true,
            action: "Accepted",
            message: `${response.data.transactionType} processed successfully.`,
            details: {
              email: response.data.email,
              type: response.data.transactionType,
              amount: response.data.amount,
              code: response.data.code
            }
          });
          
          // Update vendor balance based on transaction type
          if (response.data.transactionType === "WITHDRAW") {
            setVendorBalance(prev => prev - response.data.amount);
          } else if (response.data.transactionType === "DEPOSIT") {
            setVendorBalance(prev => prev + response.data.amount);
          }
          
        } else if (action === 'reject') {
          // Process rejection
          setTransactionStatus({
            success: true,
            action: "Rejected",
            message: `${response.data.transactionType} was rejected.`,
            details: {
              email: response.data.email,
              type: response.data.transactionType,
              amount: response.data.amount,
              code: response.data.code
            }
          });
        }
      } else {
        setTransactionStatus({
          success: false,
          message: "Could not retrieve transaction details."
        });
      }
    } catch (err) {
      console.error("Error processing transaction:", err);
      setTransactionStatus({
        success: false,
        message: err.response?.data?.message || "Error retrieving transaction details. Please check the code."
      });
    } finally {
      setIsLoading(false);
    }
  };

  console.log("User role:", userRole);
  // If no user is found or user role is not "user", show nothing or access denied message
  if (!userRole) {
    return (
      <div className="banking-container">
        <div className="banking-card">
          <p>Loading user information...</p>
        </div>
      </div>
    );
  }

  if (userRole === "USER") {
    return (
      <div className="banking-container">
        <div className="banking-card">
          <h2>Digital Banking Transaction</h2>

          {code ? (
            <div className="success-container">
              <h3>Transaction Code Generated</h3>
              <div className="code-display">{code}</div>
              <p>Show this code to the vendor to complete your transaction</p>
              <button onClick={() => setCode(null)}>New Transaction</button>
            </div>
          ) : (
            <div className="transaction-form">
              <div className="form-group">
                <label>Transaction Type:</label>
                <select
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value)}
                >
                  <option value="withdraw">Withdraw</option>
                  <option value="deposit">Deposit</option>
                </select>
              </div>


              <div className="form-group">
                <label>Select Bank:</label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  required
                >
                  <option value="">-- Select your bank --</option>
                  {bankAccounts.map((bank) => (
                    <option key={bank.id} value={bank.id}>
                      {bank.bankType}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Amount (USD):</label>
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              <button
                onClick={generateCode}
                disabled={!selectedBank || !amount || amount <= 0 || isLoading}
                className={isLoading ? "loading-btn" : ""}
              >
                {isLoading ? "Generating..." : "Generate Code"}
              </button>
              
              {error && <div className="error-message">{error}</div>}
            </div>
          )}
        </div>
      </div>
    );
  } // Replace the vendor UI section (the else block after if (userRole === "USER"))
// Replace the vendor UI section (inside the else block)

else {
    // Very simple vendor UI
    return (
      <div className="banking-container">
        <div className="banking-card">
          <h2>Vendor Payment Terminal</h2>
          
          {transactionStatus ? (
            // Transaction result display
            <div className="simple-result">
              {transactionStatus.success ? (
                <div className="success-message">
                  <div>✅ Transaction {transactionStatus.action}</div>
                  <div className="transaction-info">
                    <p><strong>Type:</strong> {transactionStatus.details?.type || "N/A"}</p>
                    <p><strong>Amount:</strong> ${transactionStatus.details?.amount || "0.00"}</p>
                    <p><strong>Customer:</strong> {transactionStatus.details?.email || "N/A"}</p>
                    <p><strong>Code:</strong> {transactionStatus.details?.code || "N/A"}</p>
                  </div>
                  <button onClick={resetTransaction}>Process Another</button>
                </div>
              ) : (
                <div className="error-message">
                  <div>❌ {transactionStatus.message}</div>
                  <button onClick={resetTransaction}>Try Again</button>
                </div>
              )}
            </div>
          ) : (
            // Simple code entry and verification form
            <div className="simple-form">
              <div className="code-entry">
                <label htmlFor="transaction-code">Enter Transaction Code:</label>
                <input
                  id="transaction-code"
                  type="text"
                  value={vendorInput}
                  onChange={(e) => setVendorInput(e.target.value)}
                  placeholder="Enter code"
                  disabled={isLoading}
                />
              </div>
              
              {isLoading ? (
                <div className="loading-indicator">Verifying transaction code...</div>
              ) : (
                <>
                  {/* Only show verify button when code entered but no details fetched yet */}
                  {vendorInput.length > 0 && !transactionDetails && (
                    <button 
                      className="verify-button"
                      onClick={() => handleVendorVerify()}
                    >
                      Verify Transaction
                    </button>
                  )}
                  
                  {/* Show transaction details and accept/reject buttons after verification */}
                  {transactionDetails && (
                    <>
                      <div className="transaction-preview">
                        <h3>Transaction Details</h3>
                        <div className="transaction-info">
                          <p><strong>Type:</strong> {transactionDetails.transactionType}</p>
                          <p><strong>Amount:</strong> ${transactionDetails.amount}</p>
                          <p><strong>Customer:</strong> {transactionDetails.email}</p>
                          <p><strong>Code:</strong> {transactionDetails.code}</p>
                        </div>
                        
                        <div className="action-buttons">
                          <button 
                            className="accept-button"
                            onClick={() => handleVendorAction('accept')}
                          >
                            Accept Payment
                          </button>
                          <button 
                            className="reject-button"
                            onClick={() => handleVendorAction('reject')}
                          >
                            Reject Payment
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
              
              {error && <div className="error-message">{error}</div>}
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default Banking;
