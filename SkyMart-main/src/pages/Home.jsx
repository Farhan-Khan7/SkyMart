import React from "react";
import {
  ArrowRight,
  Package,
  Star,
  Tag,
  ShoppingBag,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";
import Footer from "../components/Footer";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const categories = [
  {
    name: "Beauty",
    value: "beauty",
    icon: "💄",
    count: "5 Products",
  },
  {
    name: "Fragrances",
    value: "fragrances",
    icon: "🌸",
    count: "5 Products",
  },
  {
    name: "Furniture",
    value: "furniture",
    icon: "🛋️",
    count: "5 Products",
  },
  {
    name: "Groceries",
    value: "groceries",
    icon: "🥑",
    count: "5 Products",
  },
];

const features = [
  {
    title: "Fast Delivery",
    desc: "Same-day delivery",
    icon: <Truck className="text-[#C8F400]" size={28} />,
  },
  {
    title: "Secure Payments",
    desc: "100% encrypted checkout",
    icon: <ShieldCheck className="text-blue-400" size={28} />,
  },
  {
    title: "Best Prices",
    desc: "Price match guarantee",
    icon: <Tag className="text-green-400" size={28} />,
  },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const topRatedProducts = [...products]
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 6);

const newArrivalProducts = [...products]
  .sort((a, b) => b.id - a.id)
  .slice(0, 4);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const { cartItems, totalPrice } = useContext(CartContext);
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="bg-[#0D0D0D] min-h-screen text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-[#2A2A2A] bg-gradient-to-br from-[#181818] to-[#0D0D0D] px-6 py-8 md:px-10 md:py-10">
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-35 pointer-events-none">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
          linear-gradient(#2A2A2A 1px, transparent 1px),
          linear-gradient(90deg, #2A2A2A 1px, transparent 1px)
        `,
                backgroundSize: "55px 55px",
                maskImage:
                  "radial-gradient(circle at center, black 75%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(circle at center, black 75%, transparent 100%)",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8">
            {/* Left */}
            <div className="max-w-2xl">
              <p className="uppercase tracking-[5px] text-[#C8F400] text-xs font-medium">
                Good Evening 👋
              </p>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 leading-tight">
                Welcome Back,
                <br />
                <span className="text-[#C8F400]">
                  {user?.fullName || "Guest"}!
                </span>
              </h1>

              <p className="text-[#8C8C8C] text-base leading-7 mt-4 max-w-xl">
                Discover today's best deals with premium products across
                electronics, fashion, furniture and much more.
              </p>

              <div className="flex flex-wrap gap-4 mt-6">
                <button
                  onClick={() => navigate("/shop")}
                  className="bg-[#C8F400] text-black px-7 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition duration-300"
                >
                  Shop Now
                  <ArrowRight size={18} />
                </button>

                <button  onClick={() => navigate("/shop")} className="border border-[#2A2A2A] bg-[#151515]/80 hover:border-[#C8F400] hover:text-[#C8F400] px-7 py-3 rounded-2xl transition duration-300">
                  Explore
                </button>
              </div>
            </div>

            {/* Right Cards */}
            <div className="grid grid-cols-1 gap-3 w-full sm:w-72">
              {/* Cart Card */}
              <div className="flex items-center gap-4 bg-[#202A00]/90 border border-[#3C4F00] rounded-2xl px-5 py-4 backdrop-blur">
                <div className="w-12 h-12 flex-shrink-0 rounded-xl border border-[#4D6400] flex items-center justify-center text-xl bg-[#293500]">
                  🛒
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#C8F400] leading-none">
                    {cartItems.reduce((t, i) => t + i.quantity, 0)}
                  </h2>

                  <p className="text-[#A0A0A0] text-sm mt-1">Items in Cart</p>
                </div>
              </div>

              {/* Total Card */}
              <div className="flex items-center gap-4 bg-[#151515]/90 border border-[#2A2A2A] rounded-2xl px-5 py-4 backdrop-blur">
                <div className="w-12 h-12 flex-shrink-0 rounded-xl border border-[#3A3A3A] flex items-center justify-center text-xl bg-[#1E1E1E]">
                  $
                </div>

                <div>
                  <h2
                    className="text-3xl font-bold leading-none"
                    style={{ fontFamily: "Clash Display" }}
                  >
                    ${totalPrice.toFixed(2)}
                  </h2>

                  <p className="text-[#A0A0A0] text-sm mt-1">Cart Total</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {[
            {
              title: "Cart Items",
              value: cartItems.reduce(
                (total, item) => total + item.quantity,
                0,
              ),
              desc: "Products in cart",
              icon: <ShoppingBag size={24} className="text-[#C8F400]" />,
            },
            {
              title: "Cart Value",
              value: `$${totalPrice.toFixed(2)}`,
              desc: "Ready to checkout",
              icon: <Package size={24} className="text-blue-400" />,
            },
            {
              title: "Top Products",
              value: "30",
              desc: "Available in store",
              icon: <Star size={24} className="text-yellow-400" />,
            },
            {
              title: "Categories",
              value: categories.length,
              desc: "Available",
              icon: <Tag size={24} className="text-purple-400" />,
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-[#151515] border border-[#2A2A2A] rounded-3xl p-6 hover:border-[#C8F400] hover:-translate-y-1 transition-all"
            >
              <div className="flex justify-between items-start">
                {/* Left Content */}
                <div>
                  <h2 className="text-4xl font-bold text-white">
                    {item.value}
                  </h2>

                  <p className="mt-2 text-lg font-semibold">{item.title}</p>

                  <p className="text-sm text-[#6C6C6B] mt-1">{item.desc}</p>
                </div>

                {/* Right Icon */}
                <div className="w-14 h-14 rounded-2xl bg-[#202020] flex items-center justify-center">
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Categories */}
       {/* Categories */}
<section className="mt-14 sm:mt-16 lg:mt-20">
  <div className="flex items-end justify-between mb-8">
    <div>
     

     <h2 className="text-xl sm:text-2xl font-bold mt-1">
  Shop by Category
</h2>
    </div>

    <button
      onClick={() => navigate("/shop")}
      className="hidden sm:flex items-center gap-2 text-[#C8F400] font-semibold hover:gap-3 transition-all"
    >
      View All
      <ArrowRight size={18} />
    </button>
  </div>

  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
    {categories.map((cat) => (
      <div
        key={cat.name}
        onClick={() =>
          navigate(`/shop?category=${encodeURIComponent(cat.value)}`)
        }
        className="bg-[#151515] border border-[#2A2A2A] rounded-3xl p-5 sm:p-6 hover:border-[#C8F400] hover:-translate-y-1 transition-all cursor-pointer group"
      >
        <div className="flex justify-between items-start">

          <div>

            <h3 className="text-lg sm:text-xl font-semibold group-hover:text-[#C8F400] transition">
              {cat.name}
            </h3>

            <p className="text-sm text-[#6C6C6B] mt-2">
              {cat.count}
            </p>

          </div>

          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#202020] flex items-center justify-center text-2xl sm:text-3xl group-hover:bg-[#C8F400] group-hover:text-black transition">
            {cat.icon}
          </div>

        </div>
      </div>
    ))}
  </div>
</section>
       {/* Featured Products */}
{/* Featured Products */}

<section className="mt-16 lg:mt-20">

  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

    {/* Top Rated */}

    <div className="xl:col-span-2 bg-[#151515] border border-[#2A2A2A] rounded-3xl p-5 sm:p-6">

      <div className="flex justify-between items-center mb-6">

        <div>

<h2 className="text-lg sm:text-xl font-bold mt-2">
  Top Rated
</h2>

        </div>

        <button
          onClick={() => navigate("/shop?sort=rating")}
          className="text-[#C8F400] flex items-center gap-2 font-semibold"
        >
          View All
          <ArrowRight size={18} />
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {topRatedProducts.map((product) => (

          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="flex items-center gap-4 bg-[#1D1D1D] rounded-2xl p-4 hover:border hover:border-[#C8F400] transition cursor-pointer"
          >

            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl p-2 object-contain"
            />

            <div className="flex-1">

              <h3 className="text-sm sm:text-base font-semibold line-clamp-1">
                {product.title}
              </h3>

              <p className="text-xs text-gray-400 capitalize mt-1">
                {product.category}
              </p>

              <div className="flex justify-between mt-3">

                <span className="text-[#C8F400] text-base sm:text-lg font-bold">
                  ${product.price}
                </span>

                <span className="text-yellow-400 text-sm">
                  ⭐ {product.rating}
                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

    {/* New Arrivals */}

    <div className="bg-[#151515] border border-[#2A2A2A] rounded-3xl p-5 sm:p-6">

      <div className="flex justify-between items-center mb-6">

        <div>


       <h2 className="text-lg sm:text-xl font-bold mt-2">
  New Arrivals
</h2>

        </div>

        <ArrowRight className="text-[#C8F400]" />

      </div>

      <div className="space-y-4">

        {newArrivalProducts.slice(0, 3).map((product) => (

          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="flex items-center gap-3 bg-[#1D1D1D] rounded-2xl p-3 hover:border hover:border-[#C8F400] transition cursor-pointer"
          >

            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-xl p-2 object-contain"
            />

            <div className="flex-1">

              <h4 className="text-sm sm:text-base font-medium line-clamp-1">
                {product.title}
              </h4>

              <p className="text-[#C8F400] font-semibold mt-1">
                ${product.price}
              </p>

            </div>

            <span className="bg-[#C8F400] text-black text-[10px] font-bold px-2 py-1 rounded-full">
              NEW
            </span>

          </div>

        ))}

      </div>

    </div>

  </div>

</section>

        {/* Features */}
    {/* Features */}

<section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-16">

  {features.map((item) => (

    <div
      key={item.title}
      className="bg-[#151515] border border-[#2A2A2A] rounded-3xl p-5 sm:p-6 flex items-center gap-5 hover:border-[#C8F400] transition"
    >

      {item.icon}

      <div>

        <h3 className="text-lg sm:text-xl font-semibold">
          {item.title}
        </h3>

        <p className="text-sm text-[#6C6C6B] mt-1">
          {item.desc}
        </p>

      </div>

    </div>

  ))}

</section>

        {/* Footer */}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
