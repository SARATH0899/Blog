import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { UserContext } from "../context/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email: email, password: password }),
      });

      if (res.ok) {
        const data = await res.json();
        const cookies = res.headers.get("Set-Cookie");
        console.warn("Data", data);
        console.warn("Cookies", cookies);

        setUser(data);
      } else {
        console.error("Request failed with status", res.status);
      }
      navigate("/");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center justify-between px-4 md:px-16 py-4 bg-black text-white">
        <h1 className="text-lg md:text-2xl font-extrabold">
          <Link to="/">Blogosphere</Link>
        </h1>
        <h3 className="text-sm md:text-base">
          <Link to="/register" className="hover:text-gray-300">
            Register
          </Link>
        </h3>
      </div>

      <div className="flex flex-1 items-center justify-center bg-gray-100">
        <div className="bg-gray-200 shadow-lg rounded-lg p-6 md:p-8 w-[90%] sm:w-[70%] md:w-[40%] lg:w-[30%]">
          <h1 className="text-xl font-bold mb-6">Login to your Account</h1>

          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            type="email"
            placeholder="Enter your Email Address"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            type="password"
            placeholder="Enter your Password"
          />

          <button
            onClick={handleLogin}
            className="w-full px-4 py-2 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-700"
          >
            Login
          </button>

          {error && (
            <h3 className="text-red-500 text-sm mt-4">
              Something went wrong. Please try again.
            </h3>
          )}

          <div className="mt-6 flex justify-center items-center space-x-2 text-sm">
            <p>New Here?</p>
            <Link to="/register" className="text-gray-500 hover:text-black">
              Register
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;
