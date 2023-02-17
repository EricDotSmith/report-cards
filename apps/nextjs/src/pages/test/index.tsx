import { PageContainer } from "../../components/Page";
import PageLeftBar from "../../components/navigation/PageLeftBar";
import PageBottomBar from "../../components/navigation/PageBottomBar";
import { NextPage } from "next";
import PageTopBar from "../../components/navigation/PageTopBar";
import PageRightBar from "../../components/navigation/PageRightBar";
import { NextSeo } from "next-seo";

const PAGE_COLOR = "#f2aa4b";

const Test: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Test"
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
        path="/test"
      >
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
