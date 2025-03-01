import React from 'react';

const CtaSection = () => {
  return (
    <section className="bg-blue-600 text-white py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Revolutionize Cash Access?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">Join our platform as a user or vendor and help build the future of decentralized banking.</p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-100 transition duration-300">Sign Up as User</button>
          <button className="bg-transparent border-2 border-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition duration-300">Become a Vendor</button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
