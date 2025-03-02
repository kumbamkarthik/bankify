import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUniversity,
  faEye,
  faEyeSlash,
  faShieldAlt,
  faCreditCard,
  faCheckCircle,
  faPlus,
  faUser,
  faMoneyBillWave,
  faLock,
  faKey,
  faEnvelope,
  faRedo,
} from "@fortawesome/free-solid-svg-icons";

const UserAccounts = () => {
  // Add state for user info
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const [accounts, setAccounts] = useState([]);

  const [selectedBank, setSelectedBank] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [balance, setBalance] = useState(null);
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerificationInput, setShowVerificationInput] = useState(false);

  // Available banks in the system
  const bankOptions = [
    "Chase",
    "Bank of America",
    "Wells Fargo",
    "Citibank",
    "Capital One",
  ];

  // Simulated database of user's bank accounts
  const mockDatabaseAccounts = {
    Chase: {
      id: "chase-123456",
      accountNumber: "4567890123456789",
      accountName: "Primary Checking",
      balance: "3459.78",
      accountType: "Checking",
    },
    "Bank of America": {
      id: "boa-789012",
      accountNumber: "9876543210987654",
      accountName: "Premium Savings",
      balance: "12540.32",
      accountType: "Savings",
    },
    "Wells Fargo": {
      id: "wf-567890",
      accountNumber: "1234987654321098",
      accountName: "Business Account",
      balance: "8790.45",
      accountType: "Business Checking",
    },
  };

  // Fetch user data from localStorage on component mount
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setUserEmail(parsedUser.email || "");
    }
  }, []);

  const handleBankSelection = () => {
    if (!selectedBank) {
      setVerificationStatus("Please select a bank");
      return;
    }

    // First check if user is logged in and has email
    if (!userEmail) {
      setVerificationStatus(
        "Please log in first or update your profile with an email address."
      );
      return;
    }

    // Simulate checking if the selected bank exists in the database
    setVerificationStatus("Connecting to bank...");

    setTimeout(() => {
      if (mockDatabaseAccounts[selectedBank]) {
        // Bank found, prompt for verification
        setVerificationStatus(
          `Sending verification code to ${maskEmail(userEmail)}...`
        );

        // Generate a random 6-digit verification code (simulating a code sent to user's phone/email)
        const randomCode = Math.floor(
          100000 + Math.random() * 900000
        ).toString();
        console.log(`Verification code sent to ${userEmail}: ${randomCode}`);
        setVerificationCode(randomCode);

        setTimeout(() => {
          setShowVerificationInput(true);
          setEmailSent(true);
          setVerificationStatus(
            `Verification code sent to ${maskEmail(
              userEmail
            )}. Please check your inbox.`
          );
        }, 1500);
      } else {
        setVerificationStatus(
          "No accounts found with this bank. Please try another bank or contact support."
        );
        setTimeout(() => {
          setVerificationStatus("");
        }, 3000);
      }
    }, 1500);
  };

  // Function to mask email for privacy/security
  const maskEmail = (email) => {
    if (!email) return "";
    const [username, domain] = email.split("@");
    const maskedUsername =
      username.slice(0, 2) + "".padStart(username.length - 2, "*");
    return `${maskedUsername}@${domain}`;
  };

  // Function to resend verification code
  const handleResendCode = () => {
    setVerificationStatus(
      `Resending verification code to ${maskEmail(userEmail)}...`
    );

    // Generate a new random 6-digit code
    const newRandomCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    console.log(`New verification code sent to ${userEmail}: ${newRandomCode}`);
    setVerificationCode(newRandomCode);

    setTimeout(() => {
      setVerificationStatus(
        `New verification code sent to ${maskEmail(
          userEmail
        )}. Please check your inbox.`
      );
    }, 1500);
  };

  const handleVerifyCode = () => {
    // In a real app, you would compare with the code sent to user's email/phone
    // For demo, we'll just check if it matches our generated code
    if (verificationCode && verificationCode === pin) {
      setIsVerified(true);
      setShowVerificationInput(false);
      setVerificationStatus("Account verified successfully!");

      // Add the account from our mock database
      const newAccount = {
        ...mockDatabaseAccounts[selectedBank],
        bank: selectedBank,
        verified: true,
      };

      setAccounts([...accounts, newAccount]);
      setSelectedBank("");

      setTimeout(() => {
        setVerificationStatus("");
      }, 3000);
    } else {
      setVerificationStatus("Invalid verification code. Please try again.");
    }
  };

  const handleCheckBalance = (account) => {
    // In a real app, you would fetch the most current balance
    setSelectedAccount(account);
    setBalance(account.balance);
    setShowBalanceModal(true);
  };

  const handleSetAccessKey = () => {
    // Validate PIN/Access Key
    if (!/^\d{4}$/.test(pin)) {
      setVerificationStatus("Access key must be exactly 4 digits");
      return;
    }

    setVerificationStatus("Security access key set successfully!");
    setAccounts(
      accounts.map((acc) =>
        acc.id === selectedAccount.id ? { ...acc, hasAccessKey: true } : acc
      )
    );

    setPin("");
    setShowPin(false);

    setTimeout(() => {
      setVerificationStatus("");
    }, 3000);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const maskCardNumber = (number) => {
    if (!number) return "";
    const last4 = number.slice(-4);
    return `••••-••••-••••-${last4}`;
  };

  const getBankLogo = (bankName) => {
    switch (bankName.toLowerCase()) {
      case "chase":
        return "https://logo.clearbit.com/chase.com";
      case "bank of america":
        return "https://logo.clearbit.com/bankofamerica.com";
      case "wells fargo":
        return "https://logo.clearbit.com/wellsfargo.com";
      case "citibank":
        return "https://logo.clearbit.com/citibank.com";
      case "capital one":
        return "https://logo.clearbit.com/capitalone.com";
      default:
        return null;
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full">
            <FontAwesomeIcon
              icon={faUniversity}
              className="text-blue-600 text-xl"
            />
          </div>
          <h2 className="text-2xl font-bold ml-3 text-gray-800">
            My Bank Accounts
          </h2>
        </div>

        {accounts.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg">
            <FontAwesomeIcon
              icon={faCreditCard}
              className="text-gray-400 text-5xl mb-4"
            />
            <p className="text-gray-500">No accounts linked yet</p>
            <p className="text-gray-400 text-sm">
              Connect your bank account securely below
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="opacity-80 text-sm">Bank Account</span>
                      <h3 className="font-bold text-xl">{account.bank}</h3>
                      <div className="mt-1 text-sm opacity-75">
                        {account.accountType}
                      </div>
                    </div>
                    {getBankLogo(account.bank) ? (
                      <img
                        src={getBankLogo(account.bank)}
                        alt={`${account.bank} logo`}
                        className="h-8 bg-white p-1 rounded"
                      />
                    ) : (
                      <div className="bg-white p-2 rounded">
                        <FontAwesomeIcon
                          icon={faUniversity}
                          className="text-blue-600"
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <div className="text-sm opacity-75">Account Number</div>
                    <div className="font-mono font-bold">
                      {maskCardNumber(account.accountNumber)}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-end">
                    <div>
                      <div className="text-sm opacity-75">Account Name</div>
                      <div className="font-bold">{account.accountName}</div>
                    </div>
                    {account.verified && (
                      <div className="bg-green-400 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="mr-1"
                        />
                        Verified
                      </div>
                    )}
                  </div>
                </div>

                <button
                  className={`w-full py-3 text-center font-medium flex items-center justify-center ${
                    account.hasAccessKey
                      ? "bg-blue-800 hover:bg-blue-900"
                      : "bg-gray-600 hover:bg-gray-700"
                  } transition-colors`}
                  onClick={() => {
                    if (account.hasAccessKey) {
                      handleCheckBalance(account);
                    } else {
                      setSelectedAccount(account);
                      setIsVerified(true);
                      setVerificationStatus(
                        "Please set an access key to view balance"
                      );
                    }
                  }}
                >
                  <FontAwesomeIcon
                    icon={account.hasAccessKey ? faMoneyBillWave : faLock}
                    className="mr-2"
                  />
                  {account.hasAccessKey
                    ? "Check Balance"
                    : "Set Access Key to View Balance"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Connect Bank Account Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <div className="bg-green-100 p-3 rounded-full">
            <FontAwesomeIcon icon={faPlus} className="text-green-600 text-xl" />
          </div>
          <h2 className="text-2xl font-bold ml-3 text-gray-800">
            Connect Bank Account
          </h2>
        </div>

        <div className="space-y-4">
          {/* User email info */}
          {userEmail ? (
            <div className="bg-blue-50 p-3 rounded-lg text-sm">
              <p>
                Verification codes will be sent to:{" "}
                <strong>{maskEmail(userEmail)}</strong>
              </p>
            </div>
          ) : (
            <div className="bg-yellow-50 p-3 rounded-lg text-sm">
              <p className="text-yellow-800">
                <FontAwesomeIcon icon={faUser} className="mr-1" />
                Please log in to connect your bank account
              </p>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Your Bank
            </label>
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select your bank</option>
              {bankOptions.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              We use bank-level encryption to keep your credentials secure
            </p>
          </div>

          {/* Status messages */}
          {verificationStatus && (
            <div
              className={`p-3 rounded-lg ${
                verificationStatus.includes("success")
                  ? "bg-green-50 text-green-700"
                  : verificationStatus.includes("Connecting") ||
                    verificationStatus.includes("found") ||
                    verificationStatus.includes("Sending")
                  ? "bg-blue-50 text-blue-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {verificationStatus}
            </div>
          )}

          {/* Verification code input */}
          {showVerificationInput && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter Verification Code
              </label>
              <div className="relative">
                <input
                  type={showPin ? "text" : "password"}
                  value={pin}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,6}$/.test(value)) {
                      setPin(value);
                    }
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-xl"
                  placeholder="• • • • • •"
                  maxLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <FontAwesomeIcon icon={showPin ? faEyeSlash : faEye} />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                We've sent a verification code to your email. It may take a few
                moments to arrive.
              </p>

              <div className="flex justify-between items-center mt-3 gap-4">
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center flex-1"
                  onClick={handleResendCode}
                >
                  <FontAwesomeIcon icon={faRedo} className="mr-2" />
                  Resend Code
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center flex-1"
                  onClick={handleVerifyCode}
                  disabled={pin.length !== 6}
                >
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                  Verify Account
                </button>
              </div>
            </div>
          )}

          {/* Connect button */}
          {!showVerificationInput && (
            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
              onClick={handleBankSelection}
              disabled={!selectedBank || !userEmail}
            >
              <FontAwesomeIcon icon={faUniversity} className="mr-2" />
              Connect to Bank
            </button>
          )}
        </div>
      </div>

      {/* Set Access Key Section */}
      {isVerified && selectedAccount && !selectedAccount.hasAccessKey && (
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-6">
            <div className="bg-yellow-100 p-3 rounded-full">
              <FontAwesomeIcon
                icon={faKey}
                className="text-yellow-600 text-xl"
              />
            </div>
            <h2 className="text-2xl font-bold ml-3 text-gray-800">
              Set Access Key
            </h2>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              4-Digit Access Key
            </label>
            <div className="relative">
              <input
                type={showPin ? "text" : "password"}
                value={pin}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,4}$/.test(value)) {
                    setPin(value);
                  }
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-xl"
                placeholder="••••"
                maxLength={4}
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <FontAwesomeIcon icon={showPin ? faEyeSlash : faEye} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              This key will be required to access your balance information
            </p>
          </div>

          <button
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
            onClick={handleSetAccessKey}
            disabled={pin.length !== 4}
          >
            <FontAwesomeIcon icon={faKey} className="mr-2" />
            Set Access Key
          </button>
        </div>
      )}

      {/* Balance Modal */}
      {showBalanceModal && selectedAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Account Balance</h3>

            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-600">Bank</p>
              <p className="font-bold text-gray-800">{selectedAccount.bank}</p>

              <p className="text-sm text-gray-600 mt-3">Account</p>
              <p className="font-bold text-gray-800">
                {maskCardNumber(selectedAccount.accountNumber)}
              </p>

              <p className="text-sm text-gray-600 mt-3">Account Type</p>
              <p className="font-bold text-gray-800">
                {selectedAccount.accountType}
              </p>

              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-sm text-gray-600">Current Balance</p>
                <p className="text-3xl font-bold text-blue-600">
                  {formatCurrency(balance)}
                </p>
              </div>
            </div>

            <div className="text-xs text-gray-500 mb-4">
              Balance information is updated as of{" "}
              {new Date().toLocaleDateString()} at{" "}
              {new Date().toLocaleTimeString()}
            </div>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
              onClick={() => setShowBalanceModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAccounts;
