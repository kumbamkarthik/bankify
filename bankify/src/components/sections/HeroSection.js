import React from "react";
import { LogoImage } from "../../Images/LogoImage.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillTransfer,faCreditCard, faWallet } from "@fortawesome/free-solid-svg-icons";
const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Decentralized Cash Withdrawal & Deposit System
            </h1>
            <p className="text-lg mb-8">
              Get cash when you need it, where you need it. No ATMs required.
              Our platform connects you with local vendors for secure cash
              withdrawals and deposits.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-white text-blue-700 font-bold py-3 px-6 rounded-lg hover:bg-blue-100 transition duration-300">
                Get Started
              </button>
              <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-blue-700 transition duration-300">
                Become a Vendor
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative flex justify-center items-center h-full">
              {/* Background glow effect */}
              <div className="absolute w-64 h-64 bg-blue-400 rounded-full filter blur-3xl opacity-20"></div>

              {/* Main icon container */}
              <div className="relative group">
                {/* Primary icon with smooth hover animation */}
                <FontAwesomeIcon
                  icon={faMoneyBillTransfer}
                  className="text-8xl text-white/70 transform transition-all duration-500 ease-in-out hover:scale-110 z-10"
                  style={{
                    filter: "drop-shadow(0 0 15px rgba(255,255,255,0.3))",
                  }}
                />
                {/* Floating secondary icons */}
                <div className="absolute -top-8 -right-8 animate-float-slow">
                  <FontAwesomeIcon
                    icon={faCreditCard}
                    className="text-4xl text-blue-200 opacity-70"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 animate-float-delayed">
                  <FontAwesomeIcon
                    icon={faWallet}
                    className="text-4xl text-blue-200 opacity-70"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
