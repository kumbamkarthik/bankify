import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Transactions.css';

const Transactions = ({ accountId }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'deposits', 'withdrawals'
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest', 'oldest', 'highest', 'lowest'

  useEffect(() => {
    if (accountId) {
      fetchTransactions(accountId);
    }
  }, [accountId]);

  const fetchTransactions = async (id) => {
    setLoading(true);
    setError('');
    try {
      // Replace with your actual API endpoint
      const response = await axios.get('http://localhost:8084/transaction/'+JSON.parse(localStorage.getItem("user").email));
      
      if (response.data) {
        setTransactions(response.data);
      } else {
        setTransactions([]);
      }
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('Failed to load transaction history. Please try again later.');
      
      // For demo purposes, load sample data if API fails
      loadSampleTransactions();
    } finally {
      setLoading(false);
    }
  };

  // Load sample transactions for demo or when API fails
  const loadSampleTransactions = async () => {
    const sampleData = await axios.get('http://localhost:8084/transaction/'+JSON.parse(localStorage.getItem("user").email));


    setTransactions(sampleData);
  };

  // Filter transactions based on type
  const getFilteredTransactions = () => {
    if (filter === 'all') return transactions;
    return transactions.filter(t => 
      filter === 'deposits' ? t.transactionType === 'DEPOSIT' : t.transactionType === 'WITHDRAW'
    );
  };

  // Sort transactions based on selected order
  const getSortedTransactions = () => {
    const filtered = getFilteredTransactions();
    
    switch (sortOrder) {
      case 'oldest':
        return [...filtered].sort((a, b) => new Date(a.date) - new Date(b.date));
      case 'highest':
        return [...filtered].sort((a, b) => b.amount - a.amount);
      case 'lowest':
        return [...filtered].sort((a, b) => a.amount - b.amount);
      case 'newest':
      default:
        return [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get appropriate icon for transaction type
  const getTransactionIcon = (type) => {
    return type === 'DEPOSIT' ? '↓' : '↑';
  };

  return (
    <div className="transactions-container">
      <div className="transactions-header">
        <h2>Transaction History</h2>
        
        <div className="transactions-controls">
          <div className="filter-group">
            <label>Filter:</label>
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Transactions</option>
              <option value="deposits">Deposits Only</option>
              <option value="withdrawals">Withdrawals Only</option>
            </select>
          </div>
          
          <div className="sort-group">
            <label>Sort:</label>
            <select 
              value={sortOrder} 
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Amount</option>
              <option value="lowest">Lowest Amount</option>
            </select>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="loading-indicator">Loading transaction history...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : getSortedTransactions().length > 0 ? (
        <div className="transactions-list">
          {getSortedTransactions().map(transaction => (
            <div key={transaction.id} className="transaction-item">
              <div className={`transaction-icon ${transaction.type === 'DEPOSIT' ? 'deposit' : 'withdraw'}`}>
                {getTransactionIcon(transaction.type)}
              </div>
              
              <div className="transaction-details">
                <div className="transaction-description">
                  <h3>{transaction.description}</h3>
                  <span className="transaction-date">{formatDate(transaction.date)}</span>
                </div>
                
                <div className="transaction-amount-container">
                  <span className={`transaction-amount ${transaction.type === 'DEPOSIT' ? 'deposit' : 'withdraw'}`}>
                    {transaction.type === 'DEPOSIT' ? '+' : '-'} ${transaction.amount.toFixed(2)}
                  </span>
                  <span className="transaction-status">{transaction.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-transactions">
          <p>No transactions found for this account.</p>
        </div>
      )}
    </div>
  );
};

export default Transactions;