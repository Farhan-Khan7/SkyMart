import React, { useState, useEffect, useContext } from "react";
import {
  Zap,
  ShoppingCart,
  LogOut,
  Menu,
  X,
  User,
  ChevronRight,
} from "lucide-react";
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
      isActive ? "text-[#C8F400]" : "text-gray-400 hover:text-white"
    }`;

  return (
    <>
      <nav
        className={`sticky top-0 z-50 w-full
      bg-[#0D0D0D]/75 backdrop-blur-xl
      border-b border-white/10
      transition-all duration-300
      ${
        scrolled
          ? "shadow-[0_8px_30px_rgba(0,0,0,0.35)] bg-[#0D0D0D]/85 border-white/15"
          : ""
      }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          {/* Logo */}
      <NavLink to="/home" className="flex items-center gap-3 cursor-pointer">
  <div className="w-11 h-11 rounded-xl bg-[#C8F400] flex items-center justify-center">
    <Zap className="w-6 h-6 fill-black text-black" />
  </div>

  <h1 className="text-xl sm:text-2xl font-bold">
    <span className="text-white">Sky</span>
    <span className="text-[#C8F400]">Mart</span>
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
            <div className="hidden sm:flex items-center gap-3 px-3 py-2 rounded-2xl border border-[#2A2A2A] bg-[#151515]">
              <div className="w-9 h-9 rounded-xl bg-[#C8F400] flex items-center justify-center font-bold text-black">
                {user?.fullName?.charAt(0).toUpperCase()}
              </div>

              <span className="text-white font-medium">{user?.fullName}</span>
            </div>


            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative w-11 h-11 rounded-xl border border-[#2A2A2A] flex items-center justify-center"
            >
              <ShoppingCart size={20} />

              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C8F400] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Logout Desktop */}
            <button
              onClick={handleLogout}
              className="hidden sm:flex w-11 h-11 rounded-xl border border-[#2A2A2A] items-center justify-center hover:bg-red-500 transition"
            >
              <LogOut size={20} />
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setOpenMenu(true)}
              className="md:hidden w-11 h-11 rounded-xl border border-[#2A2A2A] flex items-center justify-center"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* Mobile Sidebar */}

        <div
          className={`fixed top-0 right-0 h-screen w-80 bg-[#0D0D0D] border-l border-[#2A2A2A] z-[60]
  transition-transform duration-300
  ${openMenu ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#2A2A2A]">
            <h1 className="text-2xl font-bold">
              <span className="text-white">Sky</span>
              <span className="text-[#C8F400]">Mart</span>
            </h1>

            <button
              onClick={() => setOpenMenu(false)}
              className="text-white hover:text-[#C8F400]"
            >
              <X size={24} />
            </button>
          </div>

          {/* User */}
          <div className="mx-5 mt-6 p-5 rounded-2xl bg-[#161616] border border-[#2A2A2A]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#C8F400] flex items-center justify-center text-black text-2xl font-bold shadow-lg">
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
          <div className="px-5 py-6 space-y-2">
            <NavLink
              to="/home"
              onClick={() => setOpenMenu(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-4 rounded-xl border-b border-[#2A2A2A] transition-all duration-300 ${
                  isActive
                    ? "bg-[#C8F400]/10 text-[#C8F400]"
                    : "text-gray-300 hover:bg-[#181818] hover:text-white"
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
                `flex items-center justify-between px-4 py-4 rounded-xl border-b border-[#2A2A2A] transition-all duration-300 ${
                  isActive
                    ? "bg-[#C8F400]/10 text-[#C8F400]"
                    : "text-gray-300 hover:bg-[#181818] hover:text-white"
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
                `flex items-center justify-between px-4 py-4 rounded-xl border-b border-[#2A2A2A] transition-all duration-300 ${
                  isActive
                    ? "bg-[#C8F400]/10 text-[#C8F400]"
                    : "text-gray-300 hover:bg-[#181818] hover:text-white"
                }`
              }
            >
              <span className="font-medium text-lg">About</span>
              <ChevronRight size={18} />
            </NavLink>
          </div>
          {/* Bottom Buttons */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-[#2A2A2A] space-y-4">
            <button
              onClick={() => {
                setIsCartOpen(true);
                setOpenMenu(false);
              }}
              className="w-full flex items-center justify-between bg-[#171717] hover:bg-[#202020] text-white px-5 py-4 rounded-xl transition"
            >
              <div className="flex items-center gap-3">
                <ShoppingCart className="text-[#C8F400]" size={20} />
                <span>Cart</span>
              </div>

              {cartItems.length > 0 && (
                <span className="bg-[#C8F400] text-black rounded-full px-2 py-1 text-xs font-bold">
                  {cartItems.length}
                </span>
              )}
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 justify-center bg-red-600 hover:bg-red-700 text-white px-5 py-4 rounded-xl transition"
            >
              <LogOut size={20} className="text-white" />
              Logout
            </button>
          </div>
        </div>
      </nav>
      <Cart />{" "}
    </>
  );
};

export default Navbar;
