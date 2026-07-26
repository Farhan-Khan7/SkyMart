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
className={`fixed top-0 right-0 h-screen w-full max-w-[430px] bg-[#111111]
border-l border-[#2A2A2A] z-50 flex flex-col
transition-transform duration-300
${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
>
        {/* Header */}
        <div className="px-8 py-6 border-b border-[#2A2A2A] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag size={22} className="text-[#C8F400]" />

            <h2
              className="text-[18px] text-white"
              style={{ fontFamily: "Clash Display" }}
            >
              Cart
            </h2>

            {cartItems.length > 0 && (
              <span className="bg-[#C8F400]/20 text-[#C8F400] text-xs px-3 py-1 rounded-full font-medium">
                {cartItems.length} Items
              </span>
            )}
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-7 py-5">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col justify-center items-center text-center">
              <div className="w-24 h-24 rounded-3xl border border-[#2A2A2A] flex items-center justify-center bg-[#181818]">
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
                className="mt-8 bg-[#C8F400] text-black font-semibold rounded-2xl h-12 px-8 hover:bg-lime-300 transition"
              >
                Browse Products
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="mb-4 rounded-[22px] border border-[#343434] bg-[#141414]
  px-4 py-3"
              >
                <div className="flex items-center gap-4">
                  {/* Image */}
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-16 bg-white rounded-xl object-contain p-1"
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
                      className="text-[#C8F400] text-[18px] mt-1"
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
                          className="w-9 h-9 text-white rounded-xl border border-[#333]
            flex items-center justify-center hover:border-[#C8F400]"
                        >
                          <Minus size={15} />
                        </button>

                        <span className="text-[15px] text-white font-medium w-4 text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increaseQty(item.id)}
                          className="w-9 h-9 text-white rounded-xl border border-[#333]
            flex items-center justify-center hover:border-[#C8F400]"
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
          <div className="border-t border-[#2A2A2A] px-8 py-6">
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
              className="w-full h-14 rounded-2xl bg-[#C8F400] text-black font-semibold text-lg hover:bg-lime-300 transition"
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
