import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaSun } from "react-icons/fa";
import { GoMoon, GoSun } from "react-icons/go";
import { useEffect, useState } from "react";

function Navbar() {
  const { user, logOut } = useAuth();
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/available-cars">Available Cars</NavLink>
      </li>
      {user?.email && (
        <>
          {" "}
          <li>
            <NavLink to="/add-cars">Add Cars</NavLink>
          </li>
          <li>
            <NavLink to="/my-cars">My Cars</NavLink>
          </li>
          <li>
            <NavLink to="/my-bookings">My Bookings</NavLink>
          </li>
          <li>
            <NavLink to="/manage-cars">Manage Cars</NavLink>
          </li>{" "}
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link className="logo" to="/">
          Car Heaven
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-4 px-1">{links}</ul>
      </div>
      <div className="navbar-end gap-4">
        <button onClick={toggleTheme} className="btn rounded-full">
          {theme === "light" ? <GoMoon /> : <GoSun />}
        </button>

        {user?.email ? (
          <>
            <img
              referrerPolicy="no-referrer"
              alt="Profile Image"
              className="h-12 w-12 rounded-full border object-cover"
              src={user?.photoURL}
            ></img>
            <button onClick={logOut} className="btn">
              Log Out
            </button>
          </>
        ) : (
          <Link to="/login" className="btn">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
