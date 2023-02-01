import { useRouter } from "next/router";
import classNames from "../../utils/tailwind";
import sidebarNavigation, { colorForPath } from "./Paths";

const PageBottomBar: React.FC = () => {
  const { pathname } = useRouter();

  return (
    <div
      className="flex justify-evenly"
      style={{ backgroundColor: colorForPath(pathname) }}
    >
      <div className="flex w-full flex-row items-center ">
        <div className="flex w-full flex-row">
          {sidebarNavigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.href === pathname
                  ? "bg-gray-500/20 text-white"
                  : "text-indigo-100 hover:bg-gray-500/10 hover:text-white",
                "group flex w-full flex-col items-center p-2 text-xs font-medium",
              )}
              aria-current={item.href === pathname ? "page" : undefined}
            >
              <item.icon
                className={classNames(
                  item.href === pathname
                    ? "text-yellow-300"
                    : "text-white group-hover:text-white",
                  "h-6 w-6",
                )}
                aria-hidden="true"
              />
              <span
                className={classNames(
                  item.href === pathname
                    ? "text-yellow-300"
                    : "text-white group-hover:text-white",
                  "mt-2 ",
                )}
              >
                {item.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageBottomBar;
