// store/store.js
import { create } from "zustand";

export type Tabs = "evaluation" | "report";

interface ReportPageStore {
  tab: Tabs;
  changeTab: (newColor: Tabs) => void;
}
// create store
const useReportPageStore = create<ReportPageStore>((set) => ({
  tab: "evaluation",
  changeTab: (newTab: Tabs) => {
    set(() => ({ tab: newTab }));
  },
}));

export default useReportPageStore;
