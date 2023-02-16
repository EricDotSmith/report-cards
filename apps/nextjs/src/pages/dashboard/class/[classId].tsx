import { PageContainer } from "../../../components/Page";
import PageLeftBar from "../../../components/navigation/PageLeftBar";
import PageBottomBar from "../../../components/navigation/PageBottomBar";
import { NextPage } from "next";
import Head from "next/head";
import PageTopBar from "../../../components/navigation/PageTopBar";
import PageRightBar from "../../../components/navigation/PageRightBar";
import { useRouter } from "next/router";
import ClassForm from "../../../components/ClassForm";
import { trpc } from "../../../utils/trpc";
import DotLoader from "../../../components/DotLoader/DotLoader";
import ItemNotFound from "../../../components/ItemNotFound";

const PAGE_COLOR = "#58c1fa";

const ClassPage: NextPage = () => {
  const router = useRouter();
  const { classId } = router.query;
  const { data, isLoading } = trpc.class.byId.useQuery(classId as string, {
    enabled: !!classId,
  });

  return (
    <>
      <Head>
        <title>Report Cards</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content={PAGE_COLOR}></meta>
      </Head>
      <PageContainer
        pageBottomBar={<PageBottomBar />}
        pageLeftBar={<PageLeftBar />}
        pageRightBar={<PageRightBar />}
        pageTopBar={<PageTopBar />}
        path="/dashboard/class"
      >
        {isLoading ? (
          <div className="flex w-full justify-center pt-2">
            <DotLoader color="bg-sky-300/70" />
          </div>
        ) : !!data ? (
          <ClassForm classData={data} />
        ) : (
          <ItemNotFound title="Class" />
        )}
      </PageContainer>
    </>
  );
};

export default ClassPage;
