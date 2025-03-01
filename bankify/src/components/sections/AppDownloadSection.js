import React from 'react';

const AppDownloadSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <div className="relative">
              <img src="https://placehold.co/300x600/EEE/31343C?text=App+Screen" alt="Banking Mobile App" className="mx-auto z-10 relative" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400 rounded-full opacity-20 filter blur-xl"></div>
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Get the App Today</h2>
            <p className="text-lg text-gray-600 mb-8">Download our app and start accessing cash without ATMs. Safe, secure, and convenient cash transactions at your fingertips.</p>
            <ul className="space-y-4 mb-8">
              {[
                "Find vendors near you in seconds",
                "Secure transactions with bank-level encryption",
                "Real-time transaction tracking",
                "Seamless integration with your bank account"
              ].map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="flex space-x-4">
              <a href="#" className="inline-block">
                <img src="https://placehold.co/150x50/000/FFF?text=App+Store" alt="Download on App Store" className="h-12" />
              </a>
              <a href="#" className="inline-block">
                <img src="https://placehold.co/150x50/000/FFF?text=Google+Play" alt="Get it on Google Play" className="h-12" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadSection;
