import React from 'react';

const TechnologySection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-16">Our Technology Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-white rounded-lg p-6 mb-4 mx-auto w-24 h-24 flex items-center justify-center">
              <span className="font-bold text-blue-700 text-xl">Next.js</span>
            </div>
            <p>Frontend Development</p>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-lg p-6 mb-4 mx-auto w-24 h-24 flex items-center justify-center">
              <span className="font-bold text-blue-700 text-xl">Spring</span>
            </div>
            <p>Backend API</p>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-lg p-6 mb-4 mx-auto w-24 h-24 flex items-center justify-center">
              <span className="font-bold text-blue-700 text-xl">Kafka</span>
            </div>
            <p>Event Processing</p>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-lg p-6 mb-4 mx-auto w-24 h-24 flex items-center justify-center">
              <span className="font-bold text-blue-700 text-xl">AWS</span>
            </div>
            <p>Cloud Infrastructure</p>
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <button className="bg-white text-blue-700 font-bold py-3 px-8 rounded-lg hover:bg-blue-100 transition duration-300">View Technical Documentation</button>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
