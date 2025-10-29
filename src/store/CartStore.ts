import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../types/Product";

interface CartState {
    items: Product[];
    addItem: (item: Product) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => set({ items: [...get().items, item] }),
            removeItem: (id) => set({ items: get().items.filter(i => i.id !== id) }),
            clearCart: () => set({ items: [] }),
        }),
        { name: "cart-storage" }
    )
);
