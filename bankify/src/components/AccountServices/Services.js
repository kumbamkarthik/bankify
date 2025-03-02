import React, { useState, useEffect } from 'react';
import './Services.css';

const Services = () => {
  const [activeTab, setActiveTab] = useState('withdraw');
  const [amount, setAmount] = useState('');
  const [showVendorMap, setShowVendorMap] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [processingRequest, setProcessingRequest] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [userLocation, setUserLocation] = useState(null);

  // Get user location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  }, []);

  // Dummy vendors data
  const nearbyVendors = [
    { id: 1, name: "Corner Grocery", distance: "0.3 miles", rating: 4.8, transactions: 2453, avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 2, name: "Downtown Pharmacy", distance: "0.7 miles", rating: 4.9, transactions: 3211, avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 3, name: "Central Bookstore", distance: "1.2 miles", rating: 4.7, transactions: 1872, avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
    { id: 4, name: "Quick Mart", distance: "1.5 miles", rating: 4.6, transactions: 2105, avatar: "https://randomuser.me/api/portraits/women/29.jpg" },
  ];

  // Handle amount input change
  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAmount(value);
  };

  // Handle form submission to find vendors
  const handleFindVendors = (e) => {
    e.preventDefault();
    if (amount > 0) {
      setShowVendorMap(true);
    }
  };

  // Handle vendor selection
  const handleSelectVendor = (vendor) => {
    setSelectedVendor(vendor);
  };

  // Handle request submission
  const handleRequestCash = () => {
    setProcessingRequest(true);
    // Simulate processing time
    setTimeout(() => {
      setProcessingRequest(false);
      setShowSuccessModal(true);
    }, 2000);
  };

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (value.match(/^[0-9]$/) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value !== '' && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  // Close success modal and reset flow
  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    setSelectedVendor(null);
    setShowVendorMap(false);
    setAmount('');
    setOtp(['', '', '', '']);
    setActiveTab('withdraw');
  };

  // Rendered content based on current state
  const renderContent = () => {
    if (showSuccessModal) {
      return (
        <div className="success-modal-container">
          <div className="success-modal">
            <div className="success-icon">✓</div>
            <h3>{activeTab === 'withdraw' ? 'Cash Withdrawal' : 'Cash Deposit'} Initiated</h3>
            <p>Your transaction has been successfully initiated with {selectedVendor.name}.</p>
            
            <div className="transaction-details">
              <div className="transaction-row">
                <span>Amount:</span>
                <span>${amount}</span>
              </div>
              <div className="transaction-row">
                <span>Transaction ID:</span>
                <span>#{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</span>
              </div>
              <div className="transaction-row">
                <span>Vendor:</span>
                <span>{selectedVendor.name}</span>
              </div>
            </div>
            
            <div className="otp-confirmation">
              <p>Show this OTP to the vendor to complete your transaction:</p>
              <div className="otp-display">
                <span>5</span>
                <span>2</span>
                <span>9</span>
                <span>7</span>
              </div>
              <p className="otp-expiry">OTP expires in 15:00 minutes</p>
            </div>
            
            <button className="close-success-btn" onClick={handleCloseSuccess}>
              Done
            </button>
          </div>
        </div>
      );
    }
    
    if (selectedVendor) {
      return (
        <div className="confirm-transaction">
          <button className="back-button" onClick={() => setSelectedVendor(null)}>
            ← Back to Vendors
          </button>
          
          <div className="vendor-confirmation-card">
            <div className="vendor-confirmation-header">
              <img src={selectedVendor.avatar} alt={selectedVendor.name} className="vendor-avatar" />
              <div className="vendor-confirmation-info">
                <h3>{selectedVendor.name}</h3>
                <div className="vendor-meta">
                  <span>{selectedVendor.distance}</span>
                  <span>★ {selectedVendor.rating}</span>
                  <span>{selectedVendor.transactions.toLocaleString()} transactions</span>
                </div>
              </div>
            </div>
            
            <div className="transaction-summary">
              <h4>Transaction Summary</h4>
              <div className="transaction-row">
                <span>Service:</span>
                <span>{activeTab === 'withdraw' ? 'Cash Withdrawal' : 'Cash Deposit'}</span>
              </div>
              <div className="transaction-row">
                <span>Amount:</span>
                <span>${amount}</span>
              </div>
              <div className="transaction-row">
                <span>Service Fee:</span>
                <span>$1.50</span>
              </div>
              <div className="transaction-row total">
                <span>Total:</span>
                <span>${(parseFloat(amount) + 1.50).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="otp-section">
              <h4>Enter Verification Code</h4>
              <p>Please enter the OTP sent to your registered mobile number:</p>
              <div className="otp-input-group">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    className="otp-input"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                  />
                ))}
              </div>
              <button 
                className="resend-otp"
                onClick={() => alert('OTP resent to your mobile')}
              >
                Resend OTP
              </button>
            </div>
            
            <button 
              className="confirm-transaction-btn"
              onClick={handleRequestCash}
              disabled={processingRequest || otp.join('').length !== 4}
            >
              {processingRequest ? (
                <div className="spinner"></div>
              ) : (
                `Confirm ${activeTab === 'withdraw' ? 'Withdrawal' : 'Deposit'}`
              )}
            </button>
          </div>
        </div>
      );
    }
    
    if (showVendorMap) {
      return (
        <div className="vendor-selection">
          <button className="back-button" onClick={() => setShowVendorMap(false)}>
            ← Back to Amount
          </button>
          
          <div className="vendor-header">
            <h3>Select a Nearby Vendor</h3>
            <p>Choose from verified vendors near your location</p>
          </div>
          
          <div className="vendor-map-container">
            <div className="map-placeholder">
              <div className="map-pin-current"></div>
              <div className="map-pin vendor-pin-1"></div>
              <div className="map-pin vendor-pin-2"></div>
              <div className="map-pin vendor-pin-3"></div>
              <div className="map-pin vendor-pin-4"></div>
            </div>
          </div>
          
          <div className="vendor-list">
            {nearbyVendors.map(vendor => (
              <div 
                key={vendor.id}
                className={`vendor-card ${selectedVendor?.id === vendor.id ? 'selected' : ''}`}
                onClick={() => handleSelectVendor(vendor)}
              >
                <img src={vendor.avatar} alt={vendor.name} className="vendor-avatar" />
                <div className="vendor-info">
                  <h3>{vendor.name}</h3>
                  <div className="vendor-meta">
                    <span className="vendor-distance">{vendor.distance}</span>
                    <span className="vendor-rating">★ {vendor.rating}</span>
                  </div>
                  <div className="vendor-transactions">
                    {vendor.transactions.toLocaleString()} successful transactions
                  </div>
                </div>
                <div className="vendor-select-indicator"></div>
              </div>
            ))}
          </div>
          
          <button 
            className="proceed-btn"
            disabled={!selectedVendor}
            onClick={() => setSelectedVendor(selectedVendor)}
          >
            Proceed with Selected Vendor
          </button>
        </div>
      );
    }
    
    return (
      <div className="amount-selection">
        <div className="amount-header">
          <h3>{activeTab === 'withdraw' ? 'Cash Withdrawal' : 'Cash Deposit'}</h3>
          <p>Enter the amount to {activeTab === 'withdraw' ? 'withdraw' : 'deposit'}</p>
        </div>
        
        <form onSubmit={handleFindVendors} className="amount-form">
          <div className="amount-input-group">
            <span className="currency-symbol">$</span>
            <input
              type="text"
              className="amount-input"
              value={amount}
              onChange={handleAmountChange}
              placeholder="0.00"
              autoFocus
            />
          </div>
          
          <div className="quick-amount-buttons">
            <button type="button" onClick={() => setAmount('20')}>$20</button>
            <button type="button" onClick={() => setAmount('50')}>$50</button>
            <button type="button" onClick={() => setAmount('100')}>$100</button>
            <button type="button" onClick={() => setAmount('200')}>$200</button>
          </div>
          
          <button 
            type="submit" 
            className="find-vendors-btn"
            disabled={!amount || parseFloat(amount) <= 0}
          >
            Find Nearby Vendors
          </button>
        </form>
      </div>
    
    );
  };

  return (
    <div className="services-container">
      <div className="services-header">
        <h2 className="services-title">Banking Services</h2>
        <p className="services-subtitle">Access cash anywhere with our network of verified vendors</p>
      </div>
      
      <div className="services-explainer">
        <div className="explainer-step">
          <div className="step-icon">1</div>
          <div className="step-content">
            <h4>Choose Service</h4>
            <p>Select deposit or withdrawal and enter the amount</p>
          </div>
        </div>
        <div className="explainer-step">
          <div className="step-icon">2</div>
          <div className="step-content">
            <h4>Find Vendor</h4>
            <p>Locate a nearby verified vendor</p>
          </div>
        </div>
        <div className="explainer-step">
          <div className="step-icon">3</div>
          <div className="step-content">
            <h4>Complete Transaction</h4>
            <p>Verify with OTP and get your cash</p>
          </div>
        </div>
      </div>
      
      <div className="services-content">
        <div className="service-tabs">
          <button 
            className={`service-tab ${activeTab === 'withdraw' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('withdraw');
              setShowVendorMap(false);
              setSelectedVendor(null);
            }}
          >
            <span className="tab-icon withdraw-icon">↓</span>
            Cash Withdrawal
          </button>
          <button 
            className={`service-tab ${activeTab === 'deposit' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('deposit');
              setShowVendorMap(false);
              setSelectedVendor(null);
            }}
          >
            <span className="tab-icon deposit-icon">↑</span>
            Cash Deposit
          </button>
        </div>
        
        <div className="service-content">
          {renderContent()}
        </div>
      </div>
      
      <div className="services-features">
        <div className="feature">
          <div className="feature-icon">🔒</div>
          <h3>Secure Transactions</h3>
          <p>All transactions protected with OTP verification and end-to-end encryption</p>
        </div>
        <div className="feature">
          <div className="feature-icon">📍</div>
          <h3>Nationwide Coverage</h3>
          <p>Access cash at over 100,000 verified vendors across the country</p>
        </div>
        <div className="feature">
          <div className="feature-icon">💰</div>
          <h3>Low Fees</h3>
          <p>Enjoy minimal transaction fees compared to traditional ATMs</p>
        </div>
      </div>
    </div>
  );
};

export default Services;