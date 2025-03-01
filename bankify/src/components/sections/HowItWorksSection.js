import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faStoreAlt, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="font-bold text-blue-600 text-2xl">1</span>
            </div>
            <h3 className="text-xl font-bold mb-4">Request Cash</h3>
            <p className="text-gray-600">Open the app, enter the amount you need to withdraw or deposit, and find nearby registered vendors.</p>
            <div className="mt-6">
              <FontAwesomeIcon icon={faMobileAlt} className="text-blue-500 text-4xl" />
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="font-bold text-blue-600 text-2xl">2</span>
            </div>
            <h3 className="text-xl font-bold mb-4">Match with Vendor</h3>
            <p className="text-gray-600">Our system matches you with the closest vendor who has sufficient cash reserves for your transaction.</p>
            <div className="mt-6">
              <FontAwesomeIcon icon={faStoreAlt} className="text-blue-500 text-4xl" />
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="font-bold text-blue-600 text-2xl">3</span>
            </div>
            <h3 className="text-xl font-bold mb-4">Secure Transaction</h3>
            <p className="text-gray-600">Complete the transaction with OTP verification. For withdrawals, the amount is debited from your account and credited to the vendor.</p>
            <div className="mt-6">
              <FontAwesomeIcon icon={faExchangeAlt} className="text-blue-500 text-4xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
