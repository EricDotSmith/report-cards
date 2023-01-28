import { useAuth } from "@clerk/nextjs";
import { PropsWithChildren } from "react";
import classNames from "../utils/tailwind";

const enableColouredBackground = true;

export const PageContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const { isSignedIn } = useAuth();

  return (
    <main>
      <div className={classNames("mx-auto flex max-w-7xl justify-center")}>
        {isSignedIn ? <PageLeftBar /> : null}
        <div className="w-full bg-blue-200">
          {isSignedIn ? <PageTopBar /> : null}
          {children}
          {isSignedIn ? <PageBottomBar /> : null}
        </div>
        {isSignedIn ? <PageRightBar /> : null}
      </div>
    </main>
  );
};

const PageLeftBar: React.FC = () => {
  return (
    <div
      className={classNames(
        "sticky top-0 hidden h-[100dvh] w-16 sm:block lg:w-64",
        enableColouredBackground ? "bg-red-200/40" : "",
      )}
    >
      <div className="flex h-full flex-col justify-between">
        <div>a</div>
        <div>b</div>
      </div>
    </div>
  );
};

const PageRightBar: React.FC = () => {
  return (
    <div
      className={classNames(
        "sticky top-0 hidden h-[100dvh] w-64 md:block",
        enableColouredBackground ? "bg-green-200/40" : "",
      )}
    >
      <div className="flex h-full flex-col justify-between">
        <div>a</div>
        <div>b</div>
      </div>
    </div>
  );
};

const PageTopBar: React.FC = () => {
  return (
    <div
      className={classNames(
        "sticky top-0 w-full",
        enableColouredBackground ? "bg-purple-400/40" : "",
      )}
    >
      <div className="flex w-full justify-between">
        <div>a</div>
        <div>b</div>
      </div>
    </div>
  );
};

const PageBottomBar: React.FC = () => {
  return (
    <div
      className={classNames(
        "sticky bottom-0 w-full sm:hidden",
        enableColouredBackground ? "bg-red-400/40" : "",
      )}
    >
      <div className="flex w-full justify-between">
        <div>a</div>
        <div>b</div>
      </div>
    </div>
  );
};
