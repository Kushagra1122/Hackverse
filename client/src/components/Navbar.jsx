import React from 'react'
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <nav className="bg-indigo-600 text-white py-4 px-6 flex justify-between items-center">
        <Link to={'/'} className="text-2xl font-bold tracking-wide">EdTech</Link>
        <ul className="hidden md:flex space-x-6">
          <Link to={'/'} className="hover:text-indigo-200 cursor-pointer">Home</Link>
          <li className="hover:text-indigo-200 cursor-pointer">Courses</li>
          <li className="hover:text-indigo-200 cursor-pointer">About</li>
          <li className="hover:text-indigo-200 cursor-pointer">Contact</li>
        </ul>
        <Link to={"/login"} className="bg-yellow-400 text-indigo-800 px-4 py-2 rounded-lg font-medium hover:bg-yellow-300">
          Login
        </Link>
      </nav>
    </div>
  );
}

export default Navbar
