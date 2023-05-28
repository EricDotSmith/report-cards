import classNames from "../../utils/tailwind";
import { useRouter } from "next/router";
import sidebarNavigation, { colorForPath } from "./Paths";
import Image from "next/image";

const PageLeftBar: React.FC = () => {
  const { pathname } = useRouter();

  return (
    <div
      className="flex h-full flex-col justify-start overflow-y-scroll"
      style={{ backgroundColor: colorForPath(pathname) }}
    >
      <div className="flex w-full flex-col items-center py-6">
        <div className="flex flex-shrink-0 items-center">
          <Image
            src="/report-card-icon.png"
            width={32}
            height={32}
            alt="Picture of the author"
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
                  "mt-2",
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

export default PageLeftBar;
