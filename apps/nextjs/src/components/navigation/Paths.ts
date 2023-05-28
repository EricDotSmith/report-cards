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
  {
    name: "Account",
    href: "/account",
    icon: Cog6ToothIcon,
    color: "#f08fa2",
  },
];

const pageColors: { href: string; color: keyof typeof colorMap }[] = [
  { href: "/", color: "#f6f3ec" },
  {
    href: "/dashboard",
    color: "#58c1fa",
  },
  {
    href: "/account",
    color: "#f08fa2",
  },
  {
    href: "/class",
    color: "#fb923c",
  },
  {
    href: "/report",
    color: "#b97cfc",
  },
];

export const colorForPath = (path: string) => {
  let rootPath = isValidPath(path, allPaths);
  rootPath = rootPath?.substring(0, rootPath.length - 1);

  const pathItem = pageColors.find((item) => item.href === rootPath);

  return pathItem ? pathItem.color : "#f6f3ec";
};

export const colorMap = {
  "#58c1fa": "#a0ecff",
  "#5cc956": "#9dffae",
  "#f08fa2": "#ffbeec",
  "#f2aa4b": "#ffe0b6",
  "#f6f3ec": "#f6f3ec",
  "#b97cfc": "#e9d5ff",
  "#fb923c": "#fac091",
};

//changeColor("#5cc956");
// from-[#58c1fa] from-[#5cc956] from-[#f08fa2] from-[#f2aa4b]
// to-[#a0ecff] to-[#9dffae] to-[#ffbeec] to-[#ffe0b6]

export default sidebarNavigation;
