import { PageContainer } from "../../components/Page";
import PageLeftBar from "../../components/navigation/PageLeftBar";
import PageBottomBar from "../../components/navigation/PageBottomBar";
import { NextPage } from "next";
import PageRightBar from "../../components/navigation/PageRightBar";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import DotLoader from "../../components/DotLoader/DotLoader";
import ItemNotFound from "../../components/ItemNotFound";
import { NextSeo } from "next-seo";

const PAGE_COLOR = "#58c1fa";

const ReportPage: NextPage = () => {
  const router = useRouter();
  const { reportId } = router.query;
  const { data, isLoading } = trpc.report.byId.useQuery(reportId as string, {
    enabled: !!reportId,
  });

  return (
    <>
      <NextSeo
        title="Report"
        titleTemplate="Report Cards | %s"
        description="Overview of your report"
        additionalMetaTags={[{ name: "theme-color", content: PAGE_COLOR }]}
        additionalLinkTags={[{ rel: "icon", href: "/favicon.ico" }]}
      />
      <PageContainer
        pageBottomBar={<PageBottomBar />}
        pageLeftBar={<PageLeftBar />}
        pageRightBar={<PageRightBar />}
        // pageTopBar={<ClassPageTopBar currentClass={data} />}
        path="/report"
      >
        {isLoading ? (
          <div className="flex w-full justify-center pt-2">
            <DotLoader color="bg-sky-300/70" />
          </div>
        ) : !!data ? (
          <div>report id {reportId}</div>
        ) : (
          <ItemNotFound title="Report" />
        )}
      </PageContainer>
    </>
  );
};

export default ReportPage;
