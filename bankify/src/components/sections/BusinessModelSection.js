import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faChartLine, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';

const BusinessModelSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">Business Model</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="text-blue-500 mb-6 text-center">
              <FontAwesomeIcon icon={faExchangeAlt} className="text-5xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Transaction Fee</h3>
            <p className="text-gray-600">We charge a small commission on each withdrawal and deposit transaction. The fee varies based on transaction amount.</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="text-blue-500 mb-6 text-center">
              <FontAwesomeIcon icon={faChartLine} className="text-5xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Subscription Plans</h3>
            <p className="text-gray-600">Premium vendor subscriptions offer enhanced visibility, priority matching, and reduced transaction fees.</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="text-blue-500 mb-6 text-center">
              <FontAwesomeIcon icon={faHandHoldingUsd} className="text-5xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Bank Partnerships</h3>
            <p className="text-gray-600">Financial institutions pay integration fees and share in transaction revenue for expanding their service network.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessModelSection;
