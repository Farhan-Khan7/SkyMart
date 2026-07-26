import { createContext, useState } from "react";
import { toast } from "react-hot-toast";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

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
      background: "#C8F400",
      color: "#000",
    },
    iconTheme: {
      primary: "#000",
      secondary: "#C8F400",
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