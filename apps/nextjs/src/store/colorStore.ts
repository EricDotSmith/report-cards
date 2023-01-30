// store/store.js
import { create } from "zustand";

interface ColorStore {
  color: string;
  changeColor: (newColor: string) => void;
}
// create store
const useColorStore = create<ColorStore>((set) => ({
  color: "white",
  changeColor: (newColor) => {
    document.body.style.backgroundColor = newColor;
    set(() => ({ color: newColor }));
  },
}));

export default useColorStore;
