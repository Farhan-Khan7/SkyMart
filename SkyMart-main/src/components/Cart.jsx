import { ShoppingBag, X, Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const Navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    checkout,
    totalPrice,
    isCartOpen,
    setIsCartOpen
  } = useContext(CartContext);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setIsCartOpen(false)}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300 ${
          isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-screen w-full max-w-[430px] bg-[#0a0a0a]
shadow-[-16px_0_40px_rgba(0,0,0,0.5)] z-50 flex flex-col
transition-transform duration-300
${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag size={22} className="text-[#FF8FC7]" />

            <h2
              className="text-[18px] text-white"
              style={{ fontFamily: "Clash Display" }}
            >
              Cart
            </h2>

            {cartItems.length > 0 && (
              <span className="bg-[#FF8FC7]/20 text-[#FF8FC7] text-xs px-3 py-1 rounded-full font-medium">
                {cartItems.length} Items
              </span>
            )}
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="neu neu-btn w-9 h-9 rounded-2xl flex items-center justify-center text-gray-400 hover:text-white transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-7 py-5">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col justify-center items-center text-center">
              <div className="neu w-24 h-24 rounded-2xl flex items-center justify-center">
                <ShoppingBag size={42} className="text-[#4B4B4B]" />
              </div>

              <h2
                className="mt-8 text-[28px] text-white"
                style={{ fontFamily: "Clash Display" }}
              >
                Cart is empty
              </h2>

              <p className="text-[#6C6C6B] mt-2 text-[15px]">
                Go shop something cool!
              </p>

              <button
                onClick={() => setIsCartOpen(false)}
                className="neu-accent neu-btn mt-8 text-black font-semibold rounded-2xl h-12 px-8"
              >
                Browse Products
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="neu mb-4 rounded-2xl px-4 py-3"
              >
                <div className="flex items-center gap-4">
                  {/* Image */}
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-16 bg-white rounded-2xl object-contain p-1"
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-[17px] text-white truncate"
                      style={{ fontFamily: "Syne" }}
                    >
                      {item.title}
                    </h3>

                    <p
                      className="text-[#FF8FC7] text-[18px] mt-1"
                      style={{ fontFamily: "Clash Display" }}
                    >
                      ${item.price}
                    </p>

                    <p className="text-[#666] text-[12px]">
                      ${item.price} each
                    </p>

                    {/* Qty */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="neu-sm neu-btn w-9 h-9 text-white rounded-2xl
            flex items-center justify-center hover:text-[#FF8FC7]"
                        >
                          <Minus size={15} />
                        </button>

                        <span className="text-[15px] text-white font-medium w-4 text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increaseQty(item.id)}
                          className="neu-sm neu-btn w-9 h-9 text-white rounded-2xl
            flex items-center justify-center hover:text-[#FF8FC7]"
                        >
                          <Plus size={15} />
                        </button>
                      </div>

                      <button onClick={() => removeFromCart(item.id)}>
                        <Trash2
                          size={18}
                          className="text-red-400 hover:text-red-500"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}

        {cartItems.length > 0 && (
          <div className="px-8 py-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-[#6C6C6B] text-lg">Total</span>

              <span
                className="text-[30px] text-white"
                style={{ fontFamily: "Clash Display" }}
              >
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <button
              onClick={checkout}
              className="neu-accent neu-btn w-full h-14 rounded-2xl text-black font-semibold text-lg"
            >
              Checkout →
            </button>

            <button
              onClick={clearCart}
              className="w-full mt-5 text-[#6C6C6B] text-sm hover:text-white transition"
            >
              Clear cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default Cart;
