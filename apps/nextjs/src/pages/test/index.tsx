import { PageContainer } from "../../components/Page";

const TestPage: React.FC = () => {
  return (
    <PageContainer>
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
  );
};

export default TestPage;
