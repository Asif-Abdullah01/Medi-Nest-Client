import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { FaShoppingCart, FaBars } from "react-icons/fa";
import useCart from "../../hooks/useCart";
import { IoMdArrowDropdown } from "react-icons/io";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const MedicineItems = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="order/popular">Shop</NavLink></li>
      <li>
        <Link to="dashboard/cart" className="flex items-center gap-1">
          <FaShoppingCart />
          <span className="badge badge-secondary">+{cart?.length || 0}</span>
        </Link>
      </li>
      <li className="relative group">
        <button className="flex items-center gap-1">Language <IoMdArrowDropdown /></button>
        <ul className="absolute hidden group-hover:block bg-white text-black rounded shadow-lg mt-2 p-2 z-50">
          <li><button className="hover:bg-gray-100 px-2 py-1 w-full text-left">English</button></li>
          <li><button className="hover:bg-gray-100 px-2 py-1 w-full text-left">বাংলা</button></li>
        </ul>
      </li>
    </>
  );

  return (
    <div className="navbar fixed z-10 bg-opacity-30 bg-black text-white max-w-screen-xl mx-auto">
      <div className="navbar-start">
        {/* Hamburger for mobile */}
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="btn btn-ghost text-xl">
            <FaBars />
          </button>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">🍔 MediNest</Link>
      </div>

      {/* Desktop menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{MedicineItems}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="relative">
            <img
              onClick={() => setProfileOpen(!profileOpen)}
              src={user.photoURL || "/default-avatar.png"}
              alt="profile"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
            />
            {profileOpen && (
              <ul className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-40 z-50">
                <li>
                  <Link to="/update-profile" className="block px-4 py-2 hover:bg-gray-100">Update Profile</Link>
                </li>
                <li>
                  <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <Link to="/login" className="btn btn-sm btn-outline text-white">Join Us</Link>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-36 bg-white text-black lg:hidden z-40">
          <ul className="menu p-4">{MedicineItems}</ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
