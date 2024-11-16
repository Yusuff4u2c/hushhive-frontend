import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const Navigation = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { isMobileMenuOpen, handleToggleMenu } = useContext(AppContext);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = (
    <>
      <li>
        <Link to="/">HOME</Link>
      </li>
      <li>
        <button
          onClick={toggleDropdown}
          className="relative hover:text-gray-300"
        >
          GET STARTED
        </button>
        {isDropdownOpen && (
          <div className="absolute top-12 bg-white text-black shadow-lg rounded-md z-10">
            <ul>
              <li className="hover:bg-gradient-to-r from-[#be62be] to-[#7b45d3] hover:text-white px-6 py-2">
                <Link to="/login">LOG IN</Link>
              </li>
              <li className="hover:bg-gradient-to-r from-[#be62be] to-[#7b45d3] hover:text-white px-6 py-2">
                <Link to="/register">REGISTER</Link>
              </li>
            </ul>
          </div>
        )}
      </li>
      <li>
        <a href="#">CONTACT</a>
      </li>
    </>
  );

  return (
    <div className="bg-gradient-to-r from-[#be62be] to-[#7b45d3]">
      <nav className="py-5 px-8 md:px-16 text-white flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/home">
          <h1 className="text-lg font-bold">HushHive</h1>
        </Link>

        {windowWidth > 640 ? (
          <ul className="flex gap-12 text-sm font-bold">{menuItems}</ul>
        ) : (
          <button
            onClick={handleToggleMenu}
            aria-label="Toggle Mobile Menu"
            className="text-xl focus:outline-none"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        )}
      </nav>

      {isMobileMenuOpen && (
        <ul className="flex flex-col gap-4 text-sm px-8 py-4 bg-white text-black">
          {menuItems}
        </ul>
      )}
    </div>
  );
};

export default Navigation;
