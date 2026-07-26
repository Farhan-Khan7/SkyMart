import { useParams, useNavigate } from "react-router";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShoppingCart,
  Check,
  Heart,
  ChevronLeft,
  ChevronRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { cartItems, addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isAdded = cartItems.some((item) => item.id === Number(id));

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const fetchData = async () => {
      try {
        setLoading(true);

        const [productRes, productsRes] = await Promise.all([
          axios.get(`https://dummyjson.com/products/${id}`),
          axios.get("https://dummyjson.com/products"),
        ]);

        setProduct(productRes.data);
        setProducts(productsRes.data.products);
      } catch (err) {
        console.log(err);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const relatedProducts = products
    .filter(
      (item) => item.category === product?.category && item.id !== product?.id,
    )
    .slice(0, 5);

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-[#0D0D0D] animate-pulse px-6 py-10">
          <div className="max-w-7xl mx-auto">
            <div className="h-5 w-48 bg-[#1b1b1b] rounded mb-8"></div>

            <div className="grid lg:grid-cols-2 gap-10">
              <div className="bg-[#1b1b1b] rounded-3xl h-[550px]"></div>

              <div>
                <div className="h-8 w-24 bg-[#1b1b1b] rounded mb-5"></div>

                <div className="h-12 w-80 bg-[#1b1b1b] rounded mb-6"></div>

                <div className="h-8 w-40 bg-[#1b1b1b] rounded mb-6"></div>

                <div className="space-y-3">
                  <div className="h-4 bg-[#1b1b1b] rounded"></div>

                  <div className="h-4 bg-[#1b1b1b] rounded"></div>

                  <div className="h-4 w-3/4 bg-[#1b1b1b] rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-[#0D0D0D] flex justify-center items-center text-red-500 text-xl">
          {error}
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[#0D0D0D] min-h-screen text-white"
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10">
          {/* Breadcrumb */}

          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <button
              onClick={() => navigate(-1)}
              className="hover:text-[#C8F400] flex items-center gap-1"
            >
              <ArrowLeft size={15} />
            </button>

            <span>Products</span>

            <span>/</span>

            <span>{product.category}</span>

            <span>/</span>

            <span className="text-white">{product.title}</span>
          </div>

          {/* Product Section */}

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            {/* LEFT IMAGE */}

            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-white rounded-3xl p-6 lg:p-8 flex justify-center items-center min-h-[420px] lg:min-h-[500px]"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="max-h-[320px] lg:max-h-[400px] object-contain hover:scale-105 duration-500"
              />
            </motion.div>

            {/* RIGHT SIDE */}

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              {/* Category */}

              <span className="inline-block bg-[#1A2600] text-[#C8F400] text-xs lg:text-sm px-3 py-1 rounded-full font-semibold">
                {product.category}
              </span>

              {/* Title */}

              <h1 className="text-3xl lg:text-4xl font-bold mt-4 leading-tight">
                {product.title}
              </h1>

              {/* Rating */}

              <div className="flex items-center gap-2 mt-5">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <Star
                      key={item}
                      size={16}
                      fill="#FACC15"
                      strokeWidth={1.5}
                    />
                  ))}
                </div>

                <span className="font-semibold">{product.rating}</span>

                <span className="text-gray-500 text-sm">
                  ({Math.floor(product.rating * 29)} Reviews)
                </span>
              </div>

              <hr className="border-[#333] my-5" />

              {/* Price */}

              <h2 className="text-[#C8F400] text-4xl font-bold">
                ${product.price}
              </h2>

              <hr className="border-[#333] my-5" />

              {/* Description */}

              <p className="text-gray-400 leading-7 text-base">
                {product.description}
              </p>

              {/* Add To Cart */}

              <div className="flex gap-3 mt-8">
                {isAdded ? (
                  <button className="flex-1 h-14 rounded-xl bg-green-700 text-white font-semibold flex justify-center items-center gap-2">
                    <Check size={18} />
                    Added To Cart
                  </button>
                ) : (
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 h-14 rounded-xl bg-[#C8F400] hover:bg-lime-300 transition text-black font-semibold flex justify-center items-center gap-2"
                  >
                    <ShoppingCart size={18} />
                    Add To Cart
                  </button>
                )}

                <button className="w-14 h-14 rounded-xl border border-[#333] flex justify-center items-center hover:border-[#C8F400] transition">
                  <Heart size={20} />
                </button>
              </div>

              {/* Features */}

              <div className="grid grid-cols-3 gap-2 mt-5">
                <div className="border border-[#333] rounded-lg p-3 text-center hover:border-[#C8F400] transition">
                  <Truck className="mx-auto text-[#C8F400]" size={18} />

                  <h3 className="mt-1 text-xs font-semibold">Free Delivery</h3>

                  <p className="text-gray-500 text-[10px] mt-1 leading-4">
                    Orders over $50
                  </p>
                </div>

                <div className="border border-[#333] rounded-lg p-3 text-center hover:border-[#C8F400] transition">
                  <ShieldCheck className="mx-auto text-[#C8F400]" size={18} />

                  <h3 className="mt-1 text-xs font-semibold">Secure Pay</h3>

                  <p className="text-gray-500 text-[10px] mt-1 leading-4">
                    256-bit SSL
                  </p>
                </div>

                <div className="border border-[#333] rounded-lg p-3 text-center hover:border-[#C8F400] transition">
                  <RotateCcw className="mx-auto text-[#C8F400]" size={18} />

                  <h3 className="mt-1 text-xs font-semibold">Easy Returns</h3>

                  <p className="text-gray-500 text-[10px] mt-1 leading-4">
                    30 Day Policy
                  </p>
                </div>
              </div>

              {/* Previous Next */}

              <div className="grid grid-cols-2 gap-3 mt-8">
               <button
  onClick={() => navigate(`/products/${Number(id) - 1}`)}
  disabled={Number(id) === 1}
  className="h-12 rounded-xl bg-[#1E1E1E] hover:bg-[#2A2A2A] flex justify-center items-center gap-2 transition disabled:opacity-40"
>
  <ChevronLeft size={18} />
  Previous
</button>

<button
  onClick={() => navigate(`/products/${Number(id) + 1}`)}
  disabled={Number(id) === 30}
  className="h-12 rounded-xl bg-[#C8F400] hover:bg-lime-300 text-black font-semibold flex justify-center items-center gap-2 transition disabled:opacity-40"
>
  Next
  <ChevronRight size={18} />
</button>
              </div>
            </motion.div>
          </div>
          {/* Related Products */}

          <div className="mt-20">
            <h2 className="text-4xl font-bold mb-10">Related Products</h2>

            {relatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {relatedProducts.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-16 border border-[#222] rounded-3xl">
                No related products found.
              </div>
            )}
          </div>
        </div>
         <Footer />
      </motion.div>

     
    </>
  );
};

export default ProductDetails;
