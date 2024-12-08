import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa";
import Menu from "../components/Menu";
import { UserContext } from "../context/UserContext";

function Navbar() {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const showMenu = () => {
    setMenu(!menu);
  };

  const { user } = useContext(UserContext);

  return (
    <div>
      <div className="flex items-center justify-between px-4 md:px-[200px] py-4 bg-black text-white">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/"> Blogosphere </Link>
        </h1>

        {path === "/" && (
          <div className="hidden md:flex items-center space-x-2">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="outline-none rounded-l-xl px-3 py-1 text-black bg-white w-[200px]"
              placeholder="Search a Post"
              type="text"
            />
            <p
              onClick={() => navigate(prompt ? "?search=" + prompt : "/")}
              className="cursor-pointer p-2 bg-white text-black rounded-r-xl"
            >
              <BsSearch />
            </p>
          </div>
        )}

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/write" className="hover:underline">
                Write
              </Link>
              <div onClick={showMenu} className="relative cursor-pointer">
                <FaBars />
                {menu && <Menu />}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div onClick={showMenu} className="md:hidden text-lg cursor-pointer">
          {menu ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      {menu && (
        <div className="md:hidden flex flex-col items-center bg-black text-white p-4 space-y-4">
          {user ? (
            <>
              <Link to="/write" onClick={showMenu}>
                Write
              </Link>
              <Menu />
            </>
          ) : (
            <>
              <Link to="/login" onClick={showMenu}>
                Login
              </Link>
              <Link to="/register" onClick={showMenu}>
                Register
              </Link>
            </>
          )}
          {path === "/" && (
            <div className="flex items-center space-x-2">
              <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="outline-none px-3 py-1 text-black bg-white rounded"
                placeholder="Search a Post"
                type="text"
              />
              <p
                onClick={() => navigate(prompt ? "?search=" + prompt : "/")}
                className="cursor-pointer p-2 bg-white text-black rounded"
              >
                <BsSearch />
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
