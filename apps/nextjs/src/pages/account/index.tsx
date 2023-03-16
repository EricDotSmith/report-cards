import { PageContainer } from "../../components/Page";
import PageLeftBar from "../../components/navigation/PageLeftBar";
import PageBottomBar from "../../components/navigation/PageBottomBar";
import { NextPage } from "next";
import PageTopBar from "../../components/navigation/PageTopBar";
import PageRightBar from "../../components/navigation/PageRightBar";
import { NextSeo } from "next-seo";
import { trpc } from "../../utils/trpc";
import { useState } from "react";

const PAGE_COLOR = "#f08fa2";
// Possible rename this page to account where billing will also be placed
const Settings: NextPage = () => {
  const [prompt, setPrompt] = useState("");
  const [executionId, setExecutionId] = useState("");

  const { mutate: createCompletion } = trpc.completion.create.useMutation({
    onSuccess(data, variables, context) {
      setExecutionId(data.executionId);
    },
  });

  const { data } = trpc.completion.byExecutionId.useQuery(executionId, {
    enabled: !!executionId,
    refetchInterval: 1000,
  });

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
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        ></textarea>
        <button onClick={() => createCompletion({ prompt })}>Ask prompt</button>
        <div>Result</div>
        <div>ExecutionID: {executionId}</div>
        <div className="min-h-[100px] bg-green-400 text-green-700">
          {JSON.stringify(data)}
        </div>
      </PageContainer>
    </>
  );
};

export default Settings;
