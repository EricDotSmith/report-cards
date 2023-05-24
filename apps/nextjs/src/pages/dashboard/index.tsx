import { PageContainer } from "../../components/Page";
import PageLeftBar from "../../components/navigation/PageLeftBar";
import PageBottomBar from "../../components/navigation/PageBottomBar";
import { NextPage } from "next";
import PageRightBar from "../../components/navigation/PageRightBar";
import ClassTable from "../../components/ClassTable";
import { trpc } from "../../utils/trpc";
import NoClasses from "../../components/NoClasses";
import DotLoader from "../../components/DotLoader/DotLoader";
import { NextSeo } from "next-seo";
import AccountPageTopBar from "../account/AccountPageTopBar";

const PAGE_COLOR = "#58c1fa";

const Dashboard: NextPage = () => {
  const { data, isLoading } = trpc.class.classes.useQuery();

  return (
    <>
      <NextSeo
        title="Dashboard"
        titleTemplate="Report Cards | %s"
        description="Overview"
        additionalMetaTags={[{ name: "theme-color", content: PAGE_COLOR }]}
        additionalLinkTags={[{ rel: "icon", href: "/favicon.ico" }]}
      />
      <PageContainer
        pageBottomBar={<PageBottomBar />}
        pageLeftBar={<PageLeftBar />}
        pageRightBar={<PageRightBar />}
        pageTopBar={<AccountPageTopBar />}
        path="/dashboard"
      >
        <div className="pb-8">
          {isLoading ? (
            <div className="flex w-full justify-center pt-2">
              <DotLoader color="bg-sky-300/70" />
            </div>
          ) : !!data && data.length > 0 ? (
            <ClassTable classes={data} />
          ) : (
            <NoClasses />
          )}
        </div>
      </PageContainer>
    </>
  );
};

export default Dashboard;
