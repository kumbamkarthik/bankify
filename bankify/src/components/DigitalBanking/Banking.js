import React, { useContext, useEffect, useState } from 'react';
import './Banking.css';
import AppContext from '../../AppContext';

const Banking = () => {
  const [transactionType, setTransactionType] = useState('withdraw');
  const [selectedBank, setSelectedBank] = useState('');
  const [amount, setAmount] = useState('');
  const [code, setCode] = useState(null);
  const {accounts,setAccounts} = useContext(AppContext);

  useEffect(() => {
    console.log('Accounts:', accounts);
  }, [accounts]);

  // Banks list
  const banks = [
    { id: 'bank1', name: 'First National Bank' },
    { id: 'bank2', name: 'City Trust Bank' },
    { id: 'bank3', name: 'Coastal Credit Union' }
  ];

  // Generate transaction code
  const generateCode = () => {
    if (!selectedBank || !amount || amount <= 0) return;
    
    const prefix = transactionType === 'withdraw' ? 'W' : 'D';
    const bankCode = selectedBank.substring(4);
    const timestamp = Date.now().toString().slice(-6);
    const randomDigits = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    setCode(`${prefix}-${bankCode}${timestamp}-${randomDigits}`);
  };

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
                {banks.map(bank => (
                  <option key={bank.id} value={bank.id}>
                    {bank.name}
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
              disabled={!selectedBank || !amount || amount <= 0}
            >
              Generate Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banking;