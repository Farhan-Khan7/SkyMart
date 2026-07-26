import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import SearchFilter from "../components/SearchFilter";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { useContext } from "react";
import { useSearchParams } from "react-router";
import { CartContext } from "../context/CartContext";

const Shop = () => {
  const [products, setProducts] = useState([]);
 

  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();

const initialCategory =
  searchParams.get("category") || "all";

const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("featured");
  const { cartItems, setCartItems, isCartOpen, setIsCartOpen } =
    useContext(CartContext);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => console.log(err));
  }, []);
const filteredProducts = [...products]
  .filter((product) => {
    const matchSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "all" || product.category === category;

    return matchSearch && matchCategory;
  })
  .sort((a, b) => {
    switch (sort) {
      case "low-high":
        return a.price - b.price;

      case "high-low":
        return b.price - a.price;

      case "rating":
        return b.rating - a.rating;

      default:
        return 0;
    }
  });
  return (
    <div className="min-h-screen text-white" style={{ background: "var(--bg)" }}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Heading */}
        <div className="mb-10">
        <h1
  className="text-5xl"
  style={{ fontFamily: "Clash Display" }}
>
  {category === "all"
    ? "All Products"
    : `${category.charAt(0).toUpperCase() + category.slice(1)} Products`}
</h1>

          <p className="text-[#6C6C6B] mt-2 text-lg">
            {filteredProducts.length} products found
          </p>
        </div>

        {/* Search */}
        <SearchFilter
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
        />

        {/* Products */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
