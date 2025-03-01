import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt, faMoneyBillWave, faChartLine } from '@fortawesome/free-solid-svg-icons';

const ProblemSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">The Problem We're Solving</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img src="https://placehold.co/600x400/EEE/31343C?text=ATM+Issues" alt="ATM Issues" className="rounded-lg shadow-lg" />
          </div>
          <div>
            <ul className="space-y-6">
              <li className="flex">
                <div className="bg-blue-100 rounded-full p-3 mr-4 flex-shrink-0">
                  <FontAwesomeIcon icon={faMapMarkedAlt} className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">Limited ATM Access</h3>
                  <p className="text-gray-600">Many rural and semi-urban areas have insufficient ATM coverage, forcing people to travel long distances for cash.</p>
                </div>
              </li>
              <li className="flex">
                <div className="bg-blue-100 rounded-full p-3 mr-4 flex-shrink-0">
                  <FontAwesomeIcon icon={faMoneyBillWave} className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">Cash Shortages</h3>
                  <p className="text-gray-600">ATMs frequently run out of cash, creating frustration for users who need immediate access to their funds.</p>
                </div>
              </li>
              <li className="flex">
                <div className="bg-blue-100 rounded-full p-3 mr-4 flex-shrink-0">
                  <FontAwesomeIcon icon={faChartLine} className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">High Maintenance Costs</h3>
                  <p className="text-gray-600">Banks face significant expenses maintaining ATMs, particularly in remote locations, limiting expansion.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
