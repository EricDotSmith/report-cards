import {
  HomeIcon,
  PhotoIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

export type Color = keyof typeof colorMap;

interface SidebarNavigation {
  name: string;
  href: string;
  icon: any;
  color: Color;
}

const sidebarNavigation: SidebarNavigation[] = [
  { name: "Home", href: "/", icon: HomeIcon, color: "#58c1fa" },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Squares2X2Icon,
    color: "#58c1fa",
  },
  { name: "Settings", href: "/settings", icon: PhotoIcon, color: "#f08fa2" },
  { name: "Test", href: "/test", icon: PhotoIcon, color: "#f2aa4b" },
];

export const colorMap = {
  "#58c1fa": "#a0ecff",
  "#5cc956": "#9dffae",
  "#f08fa2": "#ffbeec",
  "#f2aa4b": "#ffe0b6",
};

//changeColor("#5cc956");
// from-[#58c1fa] from-[#5cc956] from-[#f08fa2] from-[#f2aa4b]
// to-[#a0ecff] to-[#9dffae] to-[#ffbeec] to-[#ffe0b6]

export default sidebarNavigation;