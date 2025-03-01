import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faStoreAlt, faExchangeAlt, faLock } from '@fortawesome/free-solid-svg-icons';

const FeaturesSection = () => {
  const features = [
    { icon: faMobileAlt, title: "User App", desc: "Register, locate vendors, and request cash with our intuitive Next.js + Firebase app." },
    { icon: faStoreAlt, title: "Vendor App", desc: "Accept cash requests, manage available balance, and auto-deposit excess funds." },
    { icon: faExchangeAlt, title: "Transaction Backend", desc: "Event-driven processing with Kafka, Redis caching for real-time updates." },
    { icon: faLock, title: "Security & Compliance", desc: "Encrypted transactions with JWT authentication and full KYC verification." }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-8 hover:shadow-xl transition duration-300">
              <div className="text-blue-500 mb-4">
                <FontAwesomeIcon icon={feature.icon} className="text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
