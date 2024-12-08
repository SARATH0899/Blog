import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../url";
import Footer from "../components/Footer";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post(URL + "/api/auth/register", {
        username,
        email,
        password,
      });
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
      setError(false);
      navigate("/login");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between px-4 md:px-16 py-4 bg-black text-white">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/"> Blogosphere </Link>
        </h1>
        <h3>
          <Link to="/login" className="hover:text-gray-300">
            {" "}
            Login{" "}
          </Link>
        </h3>
      </div>

      <div className="flex justify-center items-center h-[80vh] bg-gray-50">
        <div className="bg-gray-200 shadow-lg rounded-lg p-6 md:p-8 w-[90%] sm:w-[70%] md:w-[40%] lg:w-[30%]">
          <h1 className="text-2xl font-bold text-center mb-6">
            Create an Account
          </h1>

          <input
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            type="text"
            placeholder="Enter your Name"
          />

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
            placeholder="Enter a new Password"
          />

          <button
            onClick={handleRegister}
            className="w-full px-4 py-2 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-700"
          >
            Register
          </button>

          {error && (
            <h3 className="text-red-500 text-sm mt-4 text-center">
              Something went wrong. Please try again.
            </h3>
          )}

          <div className="flex justify-center items-center space-x-3 mt-4">
            <p>Already have an Account?</p>
            <p className="text-gray-500 hover:text-black">
              <Link to="/login"> Login </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Register;
