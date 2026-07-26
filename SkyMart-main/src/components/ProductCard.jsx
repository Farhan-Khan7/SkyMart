import React, { useContext } from "react";
import { ShoppingCart, Check, Star } from "lucide-react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const { cartItems, addToCart } = useContext(CartContext);

  const isAdded = cartItems.some((item) => item.id === product.id);

  return (
    <Link to={`/products/${product.id}`} className="block">
      <motion.div
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.25 }}
        className="group bg-[#121212] border border-[#2A2A2A] rounded-[28px] overflow-hidden hover:border-[#C8F400] transition-all duration-300 cursor-pointer"
      >
        {/* Image */}
        <div className="relative bg-white h-[235px] flex items-center justify-center px-6 overflow-hidden">
          <span className="absolute top-4 left-4 bg-[#6B6B6B] text-white text-[12px] px-3 py-1 rounded-full capitalize font-medium z-10">
            {product.category}
          </span>

          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-h-[170px] object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="px-5 py-4">
          {/* Category */}
          <p className="uppercase tracking-[2px] text-[11px] text-[#666] font-medium">
            {product.category}
          </p>

          {/* Title */}
          <h3
            className="mt-2 text-[15px] leading-[22px] text-white font-semibold line-clamp-2 min-h-[44px]"
            style={{ fontFamily: "Syne" }}
          >
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-0.5 mt-3">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={13}
                fill={
                  index < Math.round(product.rating) ? "#FACC15" : "transparent"
                }
                className="text-yellow-400"
              />
            ))}

            <span className="text-[#666] text-[12px] ml-1">
              ({product.stock})
            </span>
          </div>

          {/* Divider */}
          <div className="border-t border-[#2A2A2A] my-4"></div>

          {/* Bottom */}
          <div className="flex items-center justify-between">
            <h2
              className="text-[18px] text-[#C8F400] font-semibold"
              style={{ fontFamily: "Clash Display" }}
            >
              ${product.price}
            </h2>

            {isAdded ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="h-9 px-4 rounded-xl bg-green-900/30 border border-green-700 text-green-400 flex items-center gap-2 text-sm font-medium"
              >
                <Check size={15} />
                Added
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="h-9 px-5 rounded-xl bg-[#C8F400] text-black flex items-center gap-2 text-sm font-semibold hover:bg-[#d8ff2f] transition-colors duration-300"
              >
                <ShoppingCart size={15} />
                Add
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
