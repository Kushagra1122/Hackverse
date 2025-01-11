import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-800 text-white py-10 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="hover:text-gray-400">
            About
          </a>
          <a href="#" className="hover:text-gray-400">
            Courses
          </a>
          <a href="#" className="hover:text-gray-400">
            Contact
          </a>
        </div>
        <p className="text-gray-400">
          &copy; 2025 EdTech Platform. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Footer
