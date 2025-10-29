import { create } from "zustand";

interface UserState {
    name: string;
    email: string;
    setName: (value: string) => void;
    setEmail: (value: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
    name: "",
    email: "",
    setName: (value) => set({ name: value }),
    setEmail: (value) => set({ email: value }),
}));
