import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLandmark } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <div>
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="rounded-full bg-gradient-to-br from-blue-100 to-white p-2 transform transition-transform duration-200 group-hover:scale-110">
              <FontAwesomeIcon 
                icon={faLandmark} 
                className="text-blue-500 text-2xl" 
              />
            </div>
            <h1 className="text-white text-3xl font-extrabold tracking-wider bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Bankify
            </h1>
          </div>
          <div className="flex space-x-8">
            <a href="/services" className="text-white hover:text-blue-200 text-lg">Services</a>
            <a href="/accounts" className="text-white hover:text-blue-200 text-lg">Accounts</a>
            <a href="/loans" className="text-white hover:text-blue-200 text-lg">Loans & Credit</a>
            <a href="/wealth" className="text-white hover:text-blue-200 text-lg">Wealth Management</a>
            <a href="/digital" className="text-white hover:text-blue-200 text-lg">Digital Banking</a>
            <a href="/payments" className="text-white hover:text-blue-200 text-lg">Payments & Transfers</a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
