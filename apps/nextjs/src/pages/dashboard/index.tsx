import { PageContainer } from "../../components/Page";
import PageLeftBar from "../../components/navigation/PageLeftBar";
import PageBottomBar from "../../components/navigation/PageBottomBar";
import { NextPage } from "next";

const Dashboard: NextPage = () => {
  return (
    <>
      <style global jsx>{`
        body {
          background-color: #58c1fa;
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
        <div>Dashboard Page</div>
      </PageContainer>
    </>
  );
};

export default Dashboard;
