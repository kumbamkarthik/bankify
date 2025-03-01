import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const Banking = () => {
  const [userType, setUserType] = useState('customer'); // customer or vendor
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('deposit'); // deposit or withdraw
  const [showQR, setShowQR] = useState(false);

  const generateQRData = () => {
    return JSON.stringify({
      amount,
      type: transactionType,
      timestamp: new Date().toISOString(),
      userId: "user123", // Replace with actual user ID from auth
    });
  };

  const handleTransaction = (e) => {
    e.preventDefault();
    setShowQR(true);
  };

  const CustomerInterface = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Transaction</h2>
      <form onSubmit={handleTransaction} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Transaction Type</label>
          <select 
            className="w-full p-2 border rounded-lg"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option value="deposit">Deposit</option>
            <option value="withdraw">Withdraw</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter amount"
            required
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Generate QR Code
        </button>
      </form>
    </div>
  );

  const VendorInterface = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Vendor Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">Today's Transactions</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">Available Balance</h3>
          <p className="text-3xl font-bold">$0.00</p>
        </div>
      </div>
      <button 
        className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        onClick={() => {/* Add QR scanner implementation */}}
      >
        Scan QR Code
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-green-50/90 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="flex justify-center mb-8">
          <button
            className={`px-4 py-2 mx-2 rounded-lg ${
              userType === 'customer' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setUserType('customer')}
          >
            Customer
          </button>
          <button
            className={`px-4 py-2 mx-2 rounded-lg ${
              userType === 'vendor' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setUserType('vendor')}
          >
            Vendor
          </button>
        </div>

        {userType === 'customer' ? <CustomerInterface /> : <VendorInterface />}

        {showQR && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-bold mb-4">Scan this QR Code</h3>
            <div className="inline-block p-4 bg-white rounded-lg">
              <QRCodeSVG 
                value={generateQRData()}
                size={200}
                level="H"
              />
            </div>
            <button 
              className="w-full mt-4 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700"
              onClick={() => setShowQR(false)}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banking;