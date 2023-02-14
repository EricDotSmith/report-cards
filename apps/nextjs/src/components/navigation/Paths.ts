import {
  HomeIcon,
  PhotoIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { allPaths, isValidPath } from "../../middleware";

export type Color = keyof typeof colorMap;

interface SidebarNavigation {
  name: string;
  href: string;
  icon: any;
  color: Color;
}

const sidebarNavigation: SidebarNavigation[] = [
  { name: "Home", href: "/", icon: HomeIcon, color: "#f6f3ec" },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Squares2X2Icon,
    color: "#58c1fa",
  },
  { name: "Test", href: "/test", icon: PhotoIcon, color: "#f2aa4b" },
  {
    name: "Settings",
    href: "/settings",
    icon: Cog6ToothIcon,
    color: "#f08fa2",
  },
];

export const colorForPath = (path: string) => {
  let rootPath = isValidPath(path, allPaths);
  rootPath = rootPath?.substring(0, rootPath.length - 1);

  const pathItem = sidebarNavigation.find((item) => item.href === rootPath);

  return pathItem ? pathItem.color : "#f6f3ec";
};

export const colorMap = {
  "#58c1fa": "#a0ecff",
  "#5cc956": "#9dffae",
  "#f08fa2": "#ffbeec",
  "#f2aa4b": "#ffe0b6",
  "#f6f3ec": "#f6f3ec",
};

//changeColor("#5cc956");
// from-[#58c1fa] from-[#5cc956] from-[#f08fa2] from-[#f2aa4b]
// to-[#a0ecff] to-[#9dffae] to-[#ffbeec] to-[#ffe0b6]

export default sidebarNavigation;
