import { AppRouter } from "@acme/api";
import { inferProcedureOutput } from "@trpc/server";
import { trpc } from "../../utils/trpc";
import DotLoader from "../DotLoader/DotLoader";

interface GeneratedReportContentProps {
  report: inferProcedureOutput<AppRouter["report"]["byId"]>;
}

const GeneratedReportContent: React.FC<GeneratedReportContentProps> = ({
  report,
}) => {
  const utils = trpc.useContext();

  const { isFetching } = trpc.completion.byExecutionId.useQuery(
    report?.reportExecutionId ?? "",
    {
      //TODO: include execution failed case
      enabled:
        report?.reportExecutionId !== "" && report?.comments.length === 0,
      refetchInterval: 5000,
      refetchOnWindowFocus: false,
      onSuccess(data) {
        if (data?.state === "succeed") {
          utils.report.byId.invalidate(report?.id as string);
        }
      },
    },
  );

  const isLoadingReport = isFetching || report?.comments.length === 0;

  return (
    <div>
      {isLoadingReport && (
        <div className="flex w-full justify-center pt-2">
          <DotLoader color="bg-sky-300/70" />
        </div>
      )}
      {report?.comments.map((comment) => (
        <div key={comment.id} className="pb-2">
          {comment.comment}
        </div>
      ))}
    </div>
  );
};

export default GeneratedReportContent;
