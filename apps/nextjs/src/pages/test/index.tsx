import { PageContainer } from "../../components/Page";
import Link from "next/link";

const TestPage: React.FC = () => {
  return (
    <PageContainer>
      <Link href="/">Go home</Link>
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
