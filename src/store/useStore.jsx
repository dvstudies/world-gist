import { create } from "zustand";

export let useStore = create((set, get) => ({
    active: "",
    leva: "",

    cities: null,
    umap: null,

    search: "",
    setSearch: (search) => set({ search }),

    // numeric sliders
    sliders: { a: 0.5, b: 0.5, c: 0.5 },
    setSlider: (key, value) =>
        set((state) => ({ sliders: { ...state.sliders, [key]: value } })),
}));
