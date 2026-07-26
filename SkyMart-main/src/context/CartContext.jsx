import { createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export const CartContext = createContext();

const CART_STORAGE_KEY = "skymart_cart";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.log("Failed to load cart from localStorage:", err);
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (err) {
      console.log("Failed to save cart to localStorage:", err);
    }
  }, [cartItems]);

 const addToCart = (product) => {
  const exists = cartItems.find((item) => item.id === product.id);

  if (exists) {
    setIsCartOpen(true);
    return;
  }

  setCartItems((prev) => [
    ...prev,
    {
      ...product,
      quantity: 1,
    },
  ]);

  setIsCartOpen(true);

  toast.success("Added to cart ✅", {
    style: {
      background: "#FF8FC7",
      color: "#000",
    },
    iconTheme: {
      primary: "#000",
      secondary: "#FF8FC7",
    },
  });
};

const removeFromCart = (id) => {
  setCartItems((prev) => prev.filter((item) => item.id !== id));

  toast.error("Product removed", {
    style: {
      background: "#151515",
      color: "#fff",
    },
  });
};

const increaseQty = (id) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};

 const decreaseQty = (id) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity:
              item.quantity > 1
                ? item.quantity - 1
                : 1,
          }
        : item
    )
  );
};

const totalPrice = cartItems.reduce(
  (acc, item) => acc + item.price * item.quantity,
  0
);

  const clearCart = () => {
  setCartItems([]);

  toast.success("Cart cleared");
};


const checkout = () => {
  toast.success("🎉 Order placed successfully!");

  setCartItems([]);
  setIsCartOpen(false);
};
  return (
  <CartContext.Provider
  value={{
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    checkout,
    totalPrice,
  }}
>
  {children}
</CartContext.Provider>
  );
};