import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/auth";
const Login = () => {
     const [email, setemail] = useState("");
     const [password, setpassword] = useState("");
      const [auth, setAuth] = useAuth();
      const navigate = useNavigate();
      useEffect(() => {
        if (auth?.user !== null) {
          navigate("/");
        }
      });
     const handleSubmit = async (e) => {
       e.preventDefault();
       const response = await fetch(`http://localhost:3000/api/auth/login`, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           email,
           password,
         }),
       });
       console.log(response);
       const res = await response.json();
         console.log(res);
         if (response.ok) {
           setAuth({
             ...auth,
             user: res.user,
             token: res.token,
           });
           localStorage.setItem("auth", JSON.stringify({ token: res.token }));
           toast.success("login successfull");
           navigate("/");

           setemail("");
           setpassword("");
         } else {
           toast.error(res.message);
         }
     };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-extrabold text-center text-indigo-600 mb-6">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Log in to your account to continue learning.
        </p>
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <a
              href="#"
              className="text-indigo-600 hover:underline text-sm font-medium"
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 hover:underline font-medium"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
