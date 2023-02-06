import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import classNames from "../utils/tailwind";
import { colorForPath, colorMap } from "./navigation/Paths";

const enableColouredBackground = false;

interface PageContainerProps extends PropsWithChildren {
  pageLeftBar?: React.ReactNode;
  pageRightBar?: React.ReactNode;
  pageTopBar?: React.ReactNode;
  pageBottomBar?: React.ReactNode;
  pageRightBarDisabled?: boolean;
  path: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  pageBottomBar,
  pageLeftBar,
  pageRightBar,
  pageTopBar,
  pageRightBarDisabled = true,
  path,
}) => {
  const { isSignedIn } = useAuth();
  const { pathname } = useRouter();

  const color = colorForPath(path);

  return (
    <main
      className="flex"
      style={{ backgroundColor: color, minHeight: "100vh" }}
    >
      <div
        className={`hidden w-[calc((100vw-1500px)/2)] bg-gradient-to-l from-[${colorForPath(
          pathname,
        )}] to-[${colorMap[colorForPath(pathname)]}] min-[1500px]:block`}
      ></div>
      <div
        style={{ backgroundColor: "#f6f3ec" }}
        className={classNames(
          "mx-auto flex max-w-[1500px] flex-grow justify-center",
        )}
      >
        {/* //note that conditional rendering causes pop in */}
        <PageLeftBar component={pageLeftBar} />
        <div
          className={classNames(
            "w-full ",
            enableColouredBackground ? "bg-blue-200/40" : "",
          )}
          style={{ minHeight: "100dvh" }}
        >
          <PageTopBar component={pageTopBar} />
          <div className="pb-8">{children}</div>
          <PageBottomBar component={pageBottomBar} />
        </div>
        {!pageRightBarDisabled && isSignedIn ? (
          <PageRightBar component={pageRightBar} />
        ) : null}
      </div>
      <div
        className={`hidden w-[calc((100vw-1500px)/2)] bg-gradient-to-r from-[${colorForPath(
          pathname,
        )}] to-[${colorMap[colorForPath(pathname)]}] min-[1500px]:block`}
      ></div>
    </main>
  );
};

interface BarProps {
  component?: React.ReactNode;
}

const PageLeftBar: React.FC<BarProps> = ({ component }) => {
  return (
    <div
      className={classNames(
        "w-18 sticky top-0 hidden h-[100dvh] sm:block ",
        enableColouredBackground ? "bg-red-200/40" : "",
      )}
    >
      {component ?? (
        <div className="flex h-full flex-col justify-between">
          <div>a</div>
          <div>b</div>
        </div>
      )}
    </div>
  );
};

const PageRightBar: React.FC<BarProps> = ({ component }) => {
  return (
    <div
      className={classNames(
        "sticky top-0 hidden h-[100dvh] w-96 md:block",
        enableColouredBackground ? "bg-green-200/40" : "",
      )}
    >
      {component ?? (
        <div className="flex h-full flex-col justify-between">
          <div>a</div>
          <div>b</div>
        </div>
      )}
    </div>
  );
};

const PageTopBar: React.FC<BarProps> = ({ component }) => {
  return (
    <div
      className={classNames(
        "sticky top-0 w-full",
        enableColouredBackground ? "bg-purple-400/40" : "",
      )}
    >
      {component ?? (
        <div className="flex w-full justify-between">
          <div>a</div>
          <div>b</div>
        </div>
      )}
    </div>
  );
};

const PageBottomBar: React.FC<BarProps> = ({ component }) => {
  return (
    <div
      className={classNames(
        "fixed bottom-0 w-full sm:hidden",
        enableColouredBackground ? "bg-red-400/40" : "",
      )}
    >
      {component ?? (
        <div className="flex w-full justify-between">
          <div>a</div>
          <div>b</div>
        </div>
      )}
    </div>
  );
};

interface DefaultPageContainerProps extends PropsWithChildren {
  path: string;
}

export const DefaultPageContainer: React.FC<DefaultPageContainerProps> = ({
  children,
  path,
}) => {
  const color = colorForPath(path);

  return (
    <main style={{ backgroundColor: color, minHeight: "100vh" }}>
      <div
        className={classNames(
          "mx-auto flex max-w-[1500px] flex-grow justify-center",
        )}
      >
        {children}
      </div>
    </main>
  );
};
