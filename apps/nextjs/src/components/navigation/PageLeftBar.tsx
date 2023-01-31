import useColorStore from "../../store/colorStore";
import classNames from "../../utils/tailwind";
import { useRouter } from "next/router";
import sidebarNavigation from "./Paths";

const PageLeftBar: React.FC = () => {
  const color = useColorStore((state) => state.color);
  const { pathname } = useRouter();

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
                item.href === pathname
                  ? "bg-gray-500/20 text-white"
                  : "text-indigo-100 hover:bg-gray-500/10 hover:text-white",
                "group flex w-full flex-col items-center rounded-md p-3 text-xs font-medium",
              )}
              aria-current={item.href === pathname ? "page" : undefined}
            >
              <item.icon
                className={classNames(
                  item.href === pathname
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

export default PageLeftBar;
