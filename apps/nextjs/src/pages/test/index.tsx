import { PageContainer } from "../../components/Page";
import Link from "next/link";
import PageLeftBar from "../../components/navigation/PageLeftBar";
import PageBottomBar from "../../components/navigation/PageBottomBar";
import { NextPage } from "next";

const Test: NextPage = () => {
  return (
    <>
      <style global jsx>{`
        body {
          background-color: #f2aa4b;
        }
      `}</style>
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
    </>
  );
};

export default Test;
