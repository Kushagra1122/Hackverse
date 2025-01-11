import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "../contexts/auth";
import toast from "react-hot-toast";
const Navbar = () => {
     const [auth, setAuth] = useAuth();
     const navigate = useNavigate();
     
     const logout = () => {
    
       toast.success("You have logged out ");
       setAuth({
         ...auth,
         user: null,
         token: null,
       });

       localStorage.removeItem("auth");
       navigate("/login");
     };
     console.log(auth)
  return (
    <div>
      <nav className="bg-indigo-600 text-white py-4 px-6 flex justify-between items-center">
        <Link to={"/"} className="text-2xl font-bold tracking-wide">
          EdTech
        </Link>

        {/* Search Bar */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search courses..."
            className="px-4 py-2 rounded-lg text-gray-800 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo-600">
            <FaSearch />
          </button>
        </div>

        <ul className="hidden md:flex space-x-6">
          <Link to={"/"} className="hover:text-indigo-200 cursor-pointer">
            Home
          </Link>
          <li className="hover:text-indigo-200 cursor-pointer">About</li>
          <li className="hover:text-indigo-200 cursor-pointer">Contact</li>
          <li className="hover:text-indigo-200 cursor-pointer">
            {auth.user === null ? (
              <></>
            ) : (
              <>{auth.user.role === "student" ? <>Calendar</> : <Link to={"/upload"}>Upload</Link>}</>
            )}
          </li>
        </ul>
        {auth?.user === null ? (
          <Link
            to={"/login"}
            className="bg-yellow-400 text-indigo-800 px-4 py-2 rounded-lg font-medium hover:bg-yellow-300"
          >
            Login
          </Link>
        ) : (
          <button
            className="bg-yellow-400 text-indigo-800 px-4 py-2 rounded-lg font-medium hover:bg-yellow-300"
            onClick={logout}
          >
            Logout
          </button>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
