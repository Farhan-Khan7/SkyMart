import React, { useState, useEffect, useContext } from "react";
import {
  Zap,
  ShoppingCart,
  LogOut,
  Menu,
  X,
  User,
  ChevronRight,
  ShoppingBag
} from "lucide-react";
// import { TiShoppingCart } from "react-icons/ti";
import { NavLink, useNavigate } from "react-router";
import { CartContext } from "../context/CartContext";
import Cart from "./Cart";

const Navbar = () => {
  const navigate = useNavigate();

  const { cartItems, isCartOpen, setIsCartOpen } = useContext(CartContext);

  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const linkStyle = ({ isActive }) =>
    `font-semibold transition ${
      isActive ? "text-[#FF8FC7]" : "text-gray-400 hover:text-white"
    }`;

  return (
    <>
      <nav
        className={`sticky top-0 z-50 w-full text-white
      bg-[#0a0a0a]/90 backdrop-blur-xl
      transition-all duration-300
      ${scrolled ? "shadow-[0_8px_30px_rgba(0,0,0,0.5)]" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/home" className="flex items-center gap-3 cursor-pointer">
            <div className="neu w-11 h-11 rounded-2xl flex items-center justify-center">
              <ShoppingBag className="w-6 h-6  text-[#FF8FC7]" />
            </div>

            <h1 className="text-xl sm:text-2xl font-bold">
              {/* <span className="text-white">Sky</span> */}
              <span className="text-[#FF8FC7]">PrimeBasket</span>
            </h1>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10 text-lg">
            <NavLink to="/home" className={linkStyle}>
              Home
            </NavLink>

            <NavLink to="/shop" className={linkStyle}>
              Shop
            </NavLink>

            <NavLink to="/about" className={linkStyle}>
              About
            </NavLink>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* User Desktop */}
            <div className="neu hidden sm:flex items-center gap-3 px-3 py-2 rounded-2xl">
              <div className="neu-sm w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-[#FF8FC7]">
                {user?.fullName?.charAt(0).toUpperCase()}
              </div>

              <span className="text-white font-medium">{user?.fullName}</span>
            </div>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="neu neu-btn relative w-11 h-11 rounded-2xl flex items-center justify-center"
            >
              <ShoppingCart size={20} />

              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF8FC7] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Logout Desktop */}
            <button
              onClick={handleLogout}
              className="neu neu-btn hidden sm:flex w-11 h-11 rounded-2xl items-center justify-center hover:text-red-500 transition"
            >
              <LogOut size={20} />
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setOpenMenu(true)}
              className="neu neu-btn md:hidden w-11 h-11 rounded-2xl flex items-center justify-center"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* Mobile Sidebar */}

        <div
          className={`fixed top-0 right-0 h-screen w-80 bg-[#0a0a0a] shadow-[-12px_0_30px_rgba(0,0,0,0.5)] z-[60]
  transition-transform duration-300
  ${openMenu ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5">
            <h1 className="text-2xl font-bold">
              <span className="text-white">Sky</span>
              <span className="text-[#FF8FC7]">Mart</span>
            </h1>

            <button
              onClick={() => setOpenMenu(false)}
              className="neu neu-btn w-10 h-10 rounded-2xl flex items-center justify-center text-white hover:text-[#FF8FC7]"
            >
              <X size={20} />
            </button>
          </div>

          {/* User */}
          <div className="neu mx-5 mt-6 p-5 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="neu-sm w-14 h-14 rounded-2xl flex items-center justify-center text-[#FF8FC7] text-2xl font-bold">
                {user?.fullName?.charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="text-gray-400 text-sm">Welcome Back 👋</p>
                <h2 className="text-white font-semibold text-lg">
                  {user?.fullName}
                </h2>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="px-5 py-6 space-y-3">
            <NavLink
              to="/home"
              onClick={() => setOpenMenu(false)}
              className={({ isActive }) =>
                `neu flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300 ${
                  isActive ? "text-[#FF8FC7]" : "text-gray-300 hover:text-white"
                }`
              }
            >
              <span className="font-medium text-lg">Home</span>
              <ChevronRight size={18} />
            </NavLink>

            <NavLink
              to="/shop"
              onClick={() => setOpenMenu(false)}
              className={({ isActive }) =>
                `neu flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300 ${
                  isActive ? "text-[#FF8FC7]" : "text-gray-300 hover:text-white"
                }`
              }
            >
              <span className="font-medium text-lg">Shop</span>
              <ChevronRight size={18} />
            </NavLink>

            <NavLink
              to="/about"
              onClick={() => setOpenMenu(false)}
              className={({ isActive }) =>
                `neu flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300 ${
                  isActive ? "text-[#FF8FC7]" : "text-gray-300 hover:text-white"
                }`
              }
            >
              <span className="font-medium text-lg">About</span>
              <ChevronRight size={18} />
            </NavLink>
          </div>
          {/* Bottom Buttons */}
          <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
            <button
              onClick={() => {
                setIsCartOpen(true);
                setOpenMenu(false);
              }}
              className="neu neu-btn w-full flex items-center justify-between text-white px-5 py-4 rounded-2xl transition"
            >
              <div className="flex items-center gap-3">
                <ShoppingCart className="text-[#FF8FC7]" size={20} />
                <span>Cart</span>
              </div>

              {cartItems.length > 0 && (
                <span className="bg-[#FF8FC7] text-black rounded-full px-2 py-1 text-xs font-bold">
                  {cartItems.length}
                </span>
              )}
            </button>

            <button
              onClick={handleLogout}
              className="neu neu-btn w-full flex items-center gap-3 justify-center text-red-500 px-5 py-4 rounded-2xl transition"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </nav>
      <Cart />
    </>
  );
};

export default Navbar;
