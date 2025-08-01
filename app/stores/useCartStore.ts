import { create } from "zustand";
import toast from "react-hot-toast";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  // Add any other product fields you need
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],

  addToCart: (product) => {
    const { cart } = get();
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      set({
        cart: cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({
        cart: [...cart, { ...product, quantity: 1 }],
      });
    }

    toast.success("Added item to cart successfully !!");
  },

  removeFromCart: (productId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    }));

    toast.success("Removed item from cart successfully !!");
  },

  clearCart: () => {
    set({ cart: [] });
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
    } else {
      set((state) => ({
        cart: state.cart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        ),
      }));
    }
  },

  getCartTotal: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  getCartItemCount: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + item.quantity, 0);
  },
}));
