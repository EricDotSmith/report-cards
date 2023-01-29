import { useAuth } from "@clerk/nextjs";
import { PropsWithChildren } from "react";
import classNames from "../utils/tailwind";

const enableColouredBackground = false;

interface PageContainerProps extends PropsWithChildren {
  pageLeftBar?: React.ReactNode;
  pageRightBar?: React.ReactNode;
  pageTopBar?: React.ReactNode;
  pageBottomBar?: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  pageBottomBar,
  pageLeftBar,
  pageRightBar,
  pageTopBar,
}) => {
  const { isSignedIn } = useAuth();

  return (
    <main>
      <div className={classNames("mx-auto flex max-w-7xl justify-center")}>
        {isSignedIn ? <PageLeftBar component={pageLeftBar} /> : null}
        <div
          className={classNames(
            "w-full",
            enableColouredBackground ? "bg-blue-200/40" : "",
          )}
          style={{ minHeight: "calc(100dvh + 1px)" }}
        >
          <PageTopBar component={pageTopBar} />
          {children}
          {isSignedIn ? <PageBottomBar component={pageBottomBar} /> : null}
        </div>
        {isSignedIn ? <PageRightBar component={pageRightBar} /> : null}
      </div>
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
        "sticky top-0 hidden h-[100dvh] w-16 sm:block lg:w-64",
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
        "sticky top-0 hidden h-[100dvh] w-64 md:block",
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
