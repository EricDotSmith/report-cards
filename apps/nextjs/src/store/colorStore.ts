// store/store.js
import { create } from "zustand";
import { Color } from "../components/navigation/Paths";

interface ColorStore {
  color: Color;
  changeColor: (newColor: Color) => void;
}
// create store
const useColorStore = create<ColorStore>((set) => ({
  color: "#58c1fa",
  changeColor: (newColor: Color) => {
    document.body.style.backgroundColor = newColor;
    set(() => ({ color: newColor }));
  },
}));

export default useColorStore;
