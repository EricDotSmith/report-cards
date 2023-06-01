import { AppRouter } from "@acme/api";
import { inferProcedureOutput } from "@trpc/server";
import { trpc } from "../../utils/trpc";
import DotLoader from "../DotLoader/DotLoader";
import { useState } from "react";
import { EvaluationType } from "../../store/reportPageStore";
import ReportCard from "./ReportCard";

interface GeneratedReportContentProps {
  report: inferProcedureOutput<AppRouter["report"]["byId"]>;
}

interface RetryButtonProps {
  evaluations?: EvaluationType[];
  reportId?: string;
  onClick: () => void;
}

const RetryButton: React.FC<RetryButtonProps> = ({
  evaluations,
  reportId,
  onClick,
}) => {
  const utils = trpc.useContext();

  const { mutate: createCompletion, isLoading } =
    trpc.completion.create.useMutation({
      onSuccess(data, variables, context) {
        if (data.executionId) {
          utils.report.byId.setData(data.reportId, (old) => {
            if (old) {
              return {
                ...old,
                reportStatus: "GENERATING",
                reportExecutionId: data.executionId,
              };
            }
          });

          onClick();
        }
      },
    });

  const handleRetryClick = () => {
    if (!!evaluations && !!reportId) {
      createCompletion({
        reportId,
      });
    }
  };
  return (
    <button
      disabled={isLoading}
      onClick={handleRetryClick}
      className="block rounded-md bg-purple-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
    >
      Retry
    </button>
  );
};

const GeneratedReportContent: React.FC<GeneratedReportContentProps> = ({
  report,
}) => {
  const utils = trpc.useContext();
  const [executionErrored, setExecutionErrored] = useState(false);

  const { isFetching, data } = trpc.completion.byExecutionId.useQuery(
    report?.reportExecutionId ?? "",
    {
      //TODO: include execution failed case
      enabled:
        report?.reportExecutionId !== "" &&
        report?.comments.length === 0 &&
        executionErrored === false,
      refetchInterval: 5000,
      refetchOnWindowFocus: false,
      onSuccess(data) {
        if (data?.state === "succeed") {
          utils.report.byId.invalidate(report?.id as string);
        }
      },
      onError(error) {
        setExecutionErrored(true);
      },
    },
  );

  const isLoadingReport = isFetching || report?.comments.length === 0;

  const errorHasOccurred =
    report?.reportStatus === "FAILED" || executionErrored;

  return (
    <>
      {errorHasOccurred ? (
        <div className="flex justify-center p-8">
          <RetryButton
            reportId={report?.id}
            evaluations={report?.studentEvaluation}
            onClick={() => {
              setExecutionErrored(false);
            }}
          />
        </div>
      ) : (
        <></>
      )}
      <div className="flex w-full justify-center p-4">
        {isLoadingReport && !errorHasOccurred && (
          <div className="flex w-full justify-center pt-2">
            <DotLoader color="bg-sky-300/70" />
          </div>
        )}
        <div className="space-y-4 pb-8">
          {report?.comments.map((comment) => (
            <ReportCard comment={comment} key={comment.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default GeneratedReportContent;
