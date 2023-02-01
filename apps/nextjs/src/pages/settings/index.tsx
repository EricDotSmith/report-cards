import { PageContainer } from "../../components/Page";
import PageLeftBar from "../../components/navigation/PageLeftBar";
import PageBottomBar from "../../components/navigation/PageBottomBar";
import { NextPage } from "next";
import Head from "next/head";
import PageTopBar from "../../components/navigation/PageTopBar";
import PageRightBar from "../../components/navigation/PageRightBar";

const PAGE_COLOR = "#f08fa2";

const Settings: NextPage = () => {
  return (
    <>
      <style global jsx>{`
        body {
          background-color: ${PAGE_COLOR};
        }
      `}</style>
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
      >
        <div>Settings Page</div>
      </PageContainer>
    </>
  );
};

export default Settings;
