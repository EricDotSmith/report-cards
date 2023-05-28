import { AppRouter } from "@acme/api";
import { inferProcedureOutput } from "@trpc/server";
import { trpc } from "../../utils/trpc";
import DotLoader from "../DotLoader/DotLoader";
import { useState } from "react";
import { EvaluationType } from "../../store/reportPageStore";

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
        gptPrompt: evaluations.map((evaluation) => ({
          studentId: evaluation.studentId,
          studentName: evaluation.studentName,
          studentPronouns: evaluation.studentPronouns,
          studentCriteriaEvaluations: evaluation.criteriaValues.map(
            (criteriaValue) => ({
              criteriaQuestion: criteriaValue.criteriaPrompt,
              teacherResponse: criteriaValue.criteriaValue,
            }),
          ),
        })),
        reportId,
      });
    }
  };
  return (
    <button
      disabled={isLoading}
      onClick={handleRetryClick}
      className="block rounded-md bg-sky-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
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
  // const errorHasOccurred =
  //   data?.state === "failed" ||
  //   (data?.state === undefined && report?.reportStatus === "GENERATING");

  const errorHasOccurred =
    report?.reportStatus === "FAILED" || executionErrored;

  return (
    <div>
      {isLoadingReport && !errorHasOccurred && (
        <div className="flex w-full justify-center pt-2">
          <DotLoader color="bg-sky-300/70" />
        </div>
      )}
      {errorHasOccurred ? (
        <RetryButton
          reportId={report?.id}
          evaluations={report?.studentEvaluation}
          onClick={() => {
            setExecutionErrored(false);
          }}
        />
      ) : (
        <></>
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
