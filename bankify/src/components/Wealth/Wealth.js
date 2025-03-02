import React from 'react';
import './Wealth.css';
import { FaChartLine, FaMoneyBillWave, FaHandHoldingUsd, FaStar, FaStore, FaMapMarkedAlt, FaMobileAlt } from 'react-icons/fa';
import { BsGraphUp, BsPiggyBank, BsArrowUpRight } from 'react-icons/bs';
import { FaRegCreditCard, FaWallet, FaInfoCircle, FaExchangeAlt } from 'react-icons/fa';
import {  BsCashStack } from 'react-icons/bs';
const Wealth = () => {
  return (
    <div className="wealth-container">
      <div className="wealth-header">
        <h1>Financial Wellness Dashboard</h1>
        <p>Personalized insights to help you spend, save, and invest wisely</p>
      </div>

      <div className="wealth-summary-card">
        <div className="summary-header">
          <h2>Your Financial Overview</h2>
          <span className="summary-date">May 2023</span>
        </div>
        <div className="summary-stats">
          <div className="stat-item">
            <h3>Spending Patterns</h3>
            <div className="stat-value"><FaMoneyBillWave /> 15% below average</div>
            <p>Great job controlling your expenses this month!</p>
          </div>
          <div className="stat-item">
            <h3>Savings Rate</h3>
            <div className="stat-value"><BsPiggyBank /> 24% of income</div>
            <p>You're on track to meet your emergency fund goal</p>
          </div>
          <div className="stat-item">
            <h3>Investment Growth</h3>
            <div className="stat-value"><BsGraphUp /> +8.3% YTD</div>
            <p>Your portfolio is outperforming market benchmarks</p>
          </div>
        </div>
      </div>

      <div className="insights-section">
        <h2>Personalized Recommendations</h2>
        <div className="insights-grid">
          <div className="insight-card">
            <div className="insight-icon"><FaHandHoldingUsd /></div>
            <h3>Spend Smarter</h3>
            <p>Based on your transaction history, we noticed you could save $75/month by consolidating your subscription services.</p>
            <span className="insight-action"><BsArrowUpRight /> Optimize Spending</span>
          </div>
          <div className="insight-card">
            <div className="insight-icon"><BsPiggyBank /></div>
            <h3>Save Strategically</h3>
            <p>Increasing your automatic savings by just 3% could help you reach your home down payment goal 6 months earlier.</p>
            <span className="insight-action"><BsArrowUpRight /> Adjust Savings</span>
          </div>
          <div className="insight-card">
            <div className="insight-icon"><FaChartLine /></div>
            <h3>Invest Wisely</h3>
            <p>Your risk tolerance profile suggests a more diversified portfolio could improve your long-term returns.</p>
            <span className="insight-action"><BsArrowUpRight /> Review Portfolio</span>
          </div>
        </div>
      </div>

      <div className="feature-highlight">
        <h2>Our Cash Management Innovation</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <FaStore className="feature-icon" />
            <h3>Local Vendor Network</h3>
            <p>Access cash through our trusted vendor network instead of searching for ATMs</p>
          </div>
          <div className="feature-card">
            <FaMapMarkedAlt className="feature-icon" />
            <h3>Always Accessible</h3>
            <p>Find cash withdrawal points even in areas with limited ATM coverage</p>
          </div>
          <div className="feature-card">
            <FaMobileAlt className="feature-icon" />
            <h3>Secure Transactions</h3>
            <p>Every transaction is verified with OTP authentication for your security</p>
          </div>
          <div className="feature-card">
            <FaStar className="feature-icon" />
            <h3>Premium Experience</h3>
            <p>Skip ATM lines and enjoy personalized service with local vendors</p>
          </div>
        </div>
      </div>

      <div className="wealth-cta-section">
        <h2>Ready to Revolutionize Your Cash Experience?</h2>
        <p>Join thousands of users who are already enjoying the convenience of our decentralized cash system.</p>
        <button className="cta-button">Explore Nearby Vendors</button>
      </div>
    </div>
  );
};

export default Wealth;