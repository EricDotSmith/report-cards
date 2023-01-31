import { PageContainer } from "../../components/Page";
import PageLeftBar from "../../components/navigation/PageLeftBar";
import PageBottomBar from "../../components/navigation/PageBottomBar";
import { NextPage } from "next";

const Settings: NextPage = () => {
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
      <div>Settings Page</div>
    </PageContainer>
  );
};

export default Settings;
