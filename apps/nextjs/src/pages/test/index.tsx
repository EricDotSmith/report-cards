import { PageContainer } from "../../components/Page";
import Link from "next/link";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { RiSettings5Line, RiSettings5Fill } from "react-icons/ri";
import { useState } from "react";
import classNames from "../../utils/tailwind";
import { IconType } from "react-icons/lib";
import useColorStore from "../../store/colorStore";

interface BottomBarIconProps {
  CheckedIcon: IconType;
  UncheckedIcon: IconType;
  title: string;
}

const BottomBarIcon: React.FC<BottomBarIconProps> = ({
  CheckedIcon,
  UncheckedIcon,
  title,
}) => {
  const [active, setActive] = useState(false);

  return (
    <div
      className="flex flex-col items-center p-1"
      onClick={() => setActive(!active)}
    >
      {active ? (
        <CheckedIcon color="yellow" size={25} />
      ) : (
        <UncheckedIcon color="white" size={25} />
      )}
      <span
        className={classNames(
          "text-sm",
          active ? "text-yellow-200" : "text-white",
        )}
      >
        {title}
      </span>
    </div>
  );
};

const SideBarIcon: React.FC<BottomBarIconProps> = ({
  CheckedIcon,
  UncheckedIcon,
  title,
}) => {
  const [active, setActive] = useState(false);
  const changeColor = useColorStore((state) => state.changeColor);

  return (
    <div
      className="flex flex-col  items-center p-1 lg:flex-row lg:space-x-2"
      onClick={() => {
        setActive(!active);
        if (title === "Settings") {
          changeColor("#5cc956");
          changeColor("#f08fa2");
          changeColor("#f2aa4b");
        } else if (title === "Home") {
          changeColor("#58c1fa");
        }
      }}
    >
      {active ? (
        <CheckedIcon color="yellow" size={30} />
      ) : (
        <UncheckedIcon color="white" size={30} />
      )}
      <span
        className={classNames(
          "text-sm lg:text-2xl",
          active ? "text-yellow-200" : "text-white",
        )}
      >
        {title}
      </span>
    </div>
  );
};
import {
  Bars3BottomLeftIcon,
  CogIcon,
  HomeIcon,
  PhotoIcon,
  PlusIcon,
  RectangleStackIcon,
  Squares2X2Icon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
const sidebarNavigation = [
  { name: "Home", href: "#", icon: HomeIcon, current: false },
  { name: "All Files", href: "#", icon: Squares2X2Icon, current: false },
  { name: "Photos", href: "#", icon: PhotoIcon, current: true },
  { name: "Shared", href: "#", icon: UserGroupIcon, current: false },
  { name: "Albums", href: "#", icon: RectangleStackIcon, current: false },
  { name: "Settings", href: "#", icon: CogIcon, current: false },
];
const PageLeftBar: React.FC = () => {
  const color = useColorStore((state) => state.color);

  return (
    <div
      className="flex h-full flex-col justify-start overflow-y-scroll"
      style={{ backgroundColor: color }}
    >
      <div className="flex w-full flex-col items-center py-6">
        <div className="flex flex-shrink-0 items-center">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=white"
            alt="Your Company"
          />
        </div>
        <div className="mt-6 w-full flex-1 space-y-1 px-2">
          {sidebarNavigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.current
                  ? "bg-gray-500/20 text-white"
                  : "text-indigo-100 hover:bg-gray-500/10 hover:text-white",
                "group flex w-full flex-col items-center rounded-md p-3 text-xs font-medium",
              )}
              aria-current={item.current ? "page" : undefined}
            >
              <item.icon
                className={classNames(
                  item.current
                    ? "text-white"
                    : "text-white group-hover:text-white",
                  "h-6 w-6",
                )}
                aria-hidden="true"
              />
              <span className="mt-2">{item.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const PageBottomBar: React.FC = () => {
  const color = useColorStore((state) => state.color);

  return (
    <div
      className="flex justify-evenly border-t  px-4"
      style={{ backgroundColor: color }}
    >
      <BottomBarIcon
        CheckedIcon={AiFillHome}
        UncheckedIcon={AiOutlineHome}
        title="Home"
      />
      <BottomBarIcon
        CheckedIcon={RiSettings5Fill}
        UncheckedIcon={RiSettings5Line}
        title="Settings"
      />
    </div>
  );
};

const TestPage: React.FC = () => {
  return (
    <PageContainer
      pageBottomBar={<PageBottomBar />}
      pageLeftBar={<PageLeftBar />}
      pageRightBar={
        <div className="flex h-full border-4 border-r-0 border-t-0 border-b-0 border-sky-400">
          some helpful card
        </div>
      }
      pageTopBar={
        <div className="w-full border-b bg-white  p-4">some helpful card</div>
      }
    >
      <Link href="/">Go home</Link>
      <div className="flex w-full flex-col items-center">
        <div className="m-2 h-32 w-32 rounded-lg bg-yellow-400 shadow-lg">
          x
        </div>
        <div className="m-2 h-32 w-32 rounded-lg bg-yellow-400 shadow-lg">
          x
        </div>{" "}
        <div className="m-2 h-32 w-32 rounded-lg bg-yellow-400 shadow-lg">
          x
        </div>
      </div>
    </PageContainer>
  );
};

export default TestPage;
