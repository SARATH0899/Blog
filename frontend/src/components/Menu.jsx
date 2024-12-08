import React, { useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Menu() {
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout", { withCredentials: true });
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="bg-black w-[200px] md:w-[250px] z-10 flex flex-col items-start absolute top-14 right-4 md:right-16 
        rounded-lg p-4 space-y-4 shadow-lg transition-transform transform md:translate-y-0 translate-y-2"
    >
      {/* Links for Unauthenticated Users */}
      {!user && (
        <>
          <h3 className="text-white text-sm md:text-base hover:text-gray-400 cursor-pointer">
            <Link to="/login">Login</Link>
          </h3>
          <h3 className="text-white text-sm md:text-base hover:text-gray-400 cursor-pointer">
            <Link to="/register">Register</Link>
          </h3>
        </>
      )}

      {/* Links for Authenticated Users */}
      {user && (
        <>
          <h3 className="text-white text-sm md:text-base hover:text-gray-400 cursor-pointer">
            <Link to={`/profile/${user._id}`}>Profile</Link>
          </h3>
          <h3 className="text-white text-sm md:text-base hover:text-gray-400 cursor-pointer">
            <Link to="/write">Write</Link>
          </h3>
          <h3 className="text-white text-sm md:text-base hover:text-gray-400 cursor-pointer">
            <Link to={`/myblogs/${user._id}`}>My Blogs</Link>
          </h3>
          <h3
            className="text-white text-sm md:text-base hover:text-gray-400 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </h3>
        </>
      )}
    </div>
  );
}

export default Menu;
