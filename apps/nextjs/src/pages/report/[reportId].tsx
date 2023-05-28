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
import ReportPageTopBar from "../../components/navigation/ReportPageTopBar";
import ReportPageContent from "../../components/ReportPage/ReportPageContent";
import GeneratedReportContent from "../../components/ReportPage/GeneratedReportContent";

const PAGE_COLOR = "#b97cfc";

const ReportPage: NextPage = () => {
  const router = useRouter();
  const { reportId } = router.query;

  const { data, isLoading } = trpc.report.byId.useQuery(reportId as string, {
    enabled: !!reportId,
    refetchOnWindowFocus: false,
  });

  const showReportPageContent = !isLoading && !!data;
  const showReport =
    !isLoading &&
    !!data &&
    (data.comments.length > 0 || data.reportStatus !== "PENDING");

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
        pageTopBar={
          !isLoading ? (
            <ReportPageTopBar
              evaluations={data?.studentEvaluation}
              hasReportBeenGenerated={data?.reportStatus !== "PENDING"}
              isReportCompleted={data?.comments?.length !== 0}
            />
          ) : (
            <></>
          )
        }
        path="/report"
      >
        {isLoading ? (
          <div className="flex w-full justify-center pt-2">
            <DotLoader color="bg-sky-300/70" />
          </div>
        ) : showReport ? (
          <GeneratedReportContent report={data} />
        ) : showReportPageContent ? (
          <ReportPageContent report={data} />
        ) : (
          <ItemNotFound title="Report" />
        )}
      </PageContainer>
    </>
  );
};

export default ReportPage;
