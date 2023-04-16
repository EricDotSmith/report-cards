import { AppRouter } from "@acme/api";
import { inferProcedureOutput } from "@trpc/server";
import useReportPageStore from "../../store/reportPageStore";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { trpc } from "../../utils/trpc";
import DotLoader from "../DotLoader/DotLoader";
import RenderEvaluation from "./RenderEvaluation";
import StudentList from "./StudentList";
import { shallow } from "zustand/shallow";

interface ReportPageContentProps {
  report: inferProcedureOutput<AppRouter["report"]["byId"]>;
}

const ReportPageContent: React.FC<ReportPageContentProps> = ({ report }) => {
  const studentEvaluations = report?.studentEvaluation;

  const [currentEvaluationIndex, setCurrentEvaluationIndex] =
    useState<number>(0);

  const utils = trpc.useContext();

  // const comments = report?.comments;
  const {
    tab,
    checkIfRequiredFieldsAreFilled,
    getValueForKey,
    getRequiredForKey,
    formState,
  } = useReportPageStore(
    (state) => ({
      tab: state.tab,
      checkIfRequiredFieldsAreFilled: state.checkIfRequiredFieldsAreFilled,
      getValueForKey: state.getValueForKey,
      getRequiredForKey: state.getRequiredForKey,
      formState: state.formState,
    }),
    shallow,
  );

  const { mutate: updateEvaluation, isLoading } =
    trpc.evaluation.update.useMutation({
      async onSuccess(data) {
        utils.report.byId.setData(data.reportId as string, (old) => {
          if (old) {
            return {
              ...old,
              studentEvaluation: old.studentEvaluation.map((oldEvaluation) => {
                if (oldEvaluation.id === data.id) {
                  return {
                    ...data,
                  };
                }
                return oldEvaluation;
              }),
            };
          }
        });

        setCurrentEvaluationIndex(currentEvaluationIndex + 1);
      },
    });

  const saveAndContinueButtonClickHandler = () => {
    const currentEvaluation = !!studentEvaluations
      ? studentEvaluations[currentEvaluationIndex]
      : undefined;

    if (!!currentEvaluation) {
      if (checkIfRequiredFieldsAreFilled()) {
        updateEvaluation({
          evaluationId: currentEvaluation.id,
          studentName: getValueForKey("name"),
          studentPronouns: getValueForKey("pronouns"),
          criteriaValues: Object.keys(formState ?? {})
            .filter((v) => v !== "name" && v !== "pronouns")
            .map((key) => {
              return {
                id: key,
                value: getValueForKey(key) ?? "",
                required: getRequiredForKey(key) ?? false,
              };
            }),
        });
      }
    }
  };

  const currentEvaluation = !!studentEvaluations
    ? studentEvaluations[currentEvaluationIndex]
    : undefined;

  const totalStudentEvaluations = studentEvaluations?.length ?? 0;
  const totalCompletedStudentEvaluations =
    studentEvaluations?.filter((evaluation) => evaluation.completed).length ??
    0;

  return (
    <>
      {tab === "evaluation" ? (
        <>
          <div className="sticky top-16 z-10 flex flex-col items-center space-y-2 bg-white p-2 px-2 shadow">
            <div>Evaluation Progress</div>
            <div className="flex h-4 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="flex flex-col justify-center overflow-hidden bg-blue-500 text-center text-xs text-white"
                role="progressbar"
                style={{
                  width: `${
                    (totalCompletedStudentEvaluations /
                      totalStudentEvaluations) *
                    100
                  }%`,
                }}
              >
                {`${totalCompletedStudentEvaluations}/${totalStudentEvaluations}`}
              </div>
            </div>
          </div>
          <div className="p-4 md:px-32">
            {currentEvaluation ? (
              <RenderEvaluation evaluation={currentEvaluation} />
            ) : null}

            <button
              type="button"
              onClick={saveAndContinueButtonClickHandler}
              disabled={isLoading}
              className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />

              {isLoading ? <DotLoader /> : "Save and continue"}
            </button>
            <div>Students</div>
            {studentEvaluations ? (
              <StudentList
                evaluations={studentEvaluations}
                selectedEvaluation={currentEvaluation}
                setSelectedEvaluationIdx={setCurrentEvaluationIndex}
              />
            ) : null}
            <div className="mb-12"></div>
          </div>
        </>
      ) : tab === "report" ? (
        <div>Report</div>
      ) : null}
    </>
  );
};

export default ReportPageContent;
