import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-75  border-t border-gray-102">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-purple-700">Job Portal</h1>

          <p className="text-gray-600 text-sm">
            © 2026 Your company All rights reserved
          </p>

          <div className="flex gap-2"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
