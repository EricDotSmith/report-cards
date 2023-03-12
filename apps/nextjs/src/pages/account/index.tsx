import { PageContainer } from "../../components/Page";
import PageLeftBar from "../../components/navigation/PageLeftBar";
import PageBottomBar from "../../components/navigation/PageBottomBar";
import { NextPage } from "next";
import PageTopBar from "../../components/navigation/PageTopBar";
import PageRightBar from "../../components/navigation/PageRightBar";
import { NextSeo } from "next-seo";

const PAGE_COLOR = "#f08fa2";
// Possible rename this page to account where billing will also be placed
const Settings: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Account"
        titleTemplate="Report Cards | %s"
        description="Overview"
        additionalMetaTags={[{ name: "theme-color", content: PAGE_COLOR }]}
        additionalLinkTags={[{ rel: "icon", href: "/favicon.ico" }]}
      />
      <PageContainer
        pageBottomBar={<PageBottomBar />}
        pageLeftBar={<PageLeftBar />}
        pageRightBar={<PageRightBar />}
        pageTopBar={<PageTopBar />}
        path="/account"
      >
        <div>Account Page</div>
      </PageContainer>
    </>
  );
};

export default Settings;
