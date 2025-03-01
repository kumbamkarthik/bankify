import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck, faStoreAlt, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';

const TargetAudienceSection = () => {
  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">Who Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
              <FontAwesomeIcon icon={faUserCheck} className="text-blue-600 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Individual Users</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>People in areas with limited ATM access</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Travelers needing emergency cash</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Anyone facing ATM downtime or cash shortages</span>
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
              <FontAwesomeIcon icon={faStoreAlt} className="text-blue-600 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Vendors</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Small business owners seeking extra revenue</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Shops with excess cash seeking safe deposit options</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Retailers looking to increase foot traffic</span>
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
              <FontAwesomeIcon icon={faHandHoldingUsd} className="text-blue-600 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Financial Institutions</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Banks looking to reduce ATM maintenance costs</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Financial services expanding into underserved areas</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Payment processors seeking cash-in/cash-out networks</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;
