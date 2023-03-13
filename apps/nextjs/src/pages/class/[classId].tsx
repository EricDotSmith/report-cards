import { PageContainer } from "../../components/Page";
import PageLeftBar from "../../components/navigation/PageLeftBar";
import PageBottomBar from "../../components/navigation/PageBottomBar";
import { NextPage } from "next";
import PageRightBar from "../../components/navigation/PageRightBar";
import { useRouter } from "next/router";
import ClassForm from "../../components/ClassForm/ClassForm";
import { trpc } from "../../utils/trpc";
import DotLoader from "../../components/DotLoader/DotLoader";
import ItemNotFound from "../../components/ItemNotFound";
import { NextSeo } from "next-seo";
import ClassPageTopBar from "../../components/navigation/ClassPageTopBar";

const PAGE_COLOR = "#58c1fa";

const ClassPage: NextPage = () => {
  const router = useRouter();
  const { classId } = router.query;
  const { data, isLoading } = trpc.class.byId.useQuery(classId as string, {
    enabled: !!classId,
  });

  return (
    <>
      <NextSeo
        title="Class"
        titleTemplate="Report Cards | %s"
        description="Overview of your class"
        additionalMetaTags={[{ name: "theme-color", content: PAGE_COLOR }]}
        additionalLinkTags={[{ rel: "icon", href: "/favicon.ico" }]}
      />
      <PageContainer
        pageBottomBar={<PageBottomBar />}
        pageLeftBar={<PageLeftBar />}
        pageRightBar={<PageRightBar />}
        pageTopBar={<ClassPageTopBar currentClass={data} />}
        path="/class"
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
