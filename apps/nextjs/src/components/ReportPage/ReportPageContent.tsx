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
import MissingFieldsAlert from "./MissingFieldsAlert";

interface ReportPageContentProps {
  report: inferProcedureOutput<AppRouter["report"]["byId"]>;
}

const ReportPageContent: React.FC<ReportPageContentProps> = ({ report }) => {
  const studentEvaluations = report?.studentEvaluation;

  const [currentEvaluationIndex, setCurrentEvaluationIndex] =
    useState<number>(0);

  const [showMissingFieldsAlert, setShowMissingFieldsAlert] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const utils = trpc.useContext();

  const {
    checkIfRequiredFieldsAreFilled,
    getValueForKey,
    getRequiredForKey,
    getTypeForKey,
    getPromptForKey,
    formState,
  } = useReportPageStore(
    (state) => ({
      checkIfRequiredFieldsAreFilled: state.checkIfRequiredFieldsAreFilled,
      getValueForKey: state.getValueForKey,
      getRequiredForKey: state.getRequiredForKey,
      getTypeForKey: state.getTypeForKey,
      getPromptForKey: state.getPromptForKey,
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
      onError(error) {
        setErrorMessage(error.message);
      },
    });

  const saveAndContinueButtonClickHandler = () => {
    const currentEvaluation = !!studentEvaluations
      ? studentEvaluations[currentEvaluationIndex]
      : undefined;

    if (!!currentEvaluation) {
      const requiredFieldsAreFilled = checkIfRequiredFieldsAreFilled();
      setShowMissingFieldsAlert(!requiredFieldsAreFilled);
      setErrorMessage("");
      if (requiredFieldsAreFilled) {
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
                type: getTypeForKey(key) ?? "text",
              };
            }),
        });
      }
    }
  };

  const currentEvaluation = !!studentEvaluations
    ? studentEvaluations[currentEvaluationIndex]
    : undefined;

  const errorMessageToShow = `[${getPromptForKey(
    (errorMessage ?? "")?.split("-")[0] ?? "",
  )}] ${(errorMessage ?? "")?.split("-")[1] ?? ""}`;

  return (
    <>
      <div className="p-4 md:px-32">
        {currentEvaluation ? (
          <RenderEvaluation evaluation={currentEvaluation} />
        ) : null}

        {showMissingFieldsAlert ? <MissingFieldsAlert /> : null}

        {errorMessage.length > 0 ? (
          <MissingFieldsAlert errorMessages={[errorMessageToShow]} />
        ) : null}

        <div className="flex w-full justify-center">
          {currentEvaluation ? (
            <button
              type="button"
              onClick={saveAndContinueButtonClickHandler}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              {isLoading ? null : (
                <CheckCircleIcon
                  className="-ml-0.5 h-5 w-5"
                  aria-hidden="true"
                />
              )}
              {isLoading ? <DotLoader /> : "Save and continue"}
            </button>
          ) : null}
        </div>
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
  );
};

export default ReportPageContent;
