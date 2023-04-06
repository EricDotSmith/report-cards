import { AppRouter } from "@acme/api";
import { CriteriaValuePair } from "@acme/db";
import { inferProcedureOutput } from "@trpc/server";
import useReportPageStore, {
  EvaluationType,
} from "../../store/reportPageStore";
import classNames from "../../utils/tailwind";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";
import DotLoader from "../DotLoader/DotLoader";

interface ReportPageContentProps {
  report: inferProcedureOutput<AppRouter["report"]["byId"]>;
}

interface RenderEvaluationProps {
  evaluation: EvaluationType;
}

interface SpecialInputProps {
  criteria: CriteriaValuePair;
}

const SpecialInput: React.FC<SpecialInputProps> = ({ criteria }) => {
  const reportPageStore = useReportPageStore();

  if (criteria.criteriaType === "COMMENT") {
    return (
      <>
        <label
          htmlFor={criteria.criteriaType}
          className="block text-xs font-medium text-gray-900"
        >
          {criteria.criteriaPrompt}
        </label>
        <input
          type="text"
          name={criteria.criteriaType}
          id={criteria.criteriaId}
          value={reportPageStore.getValueForKey(criteria.id) ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            reportPageStore.updateFormState(criteria.id, value);
          }}
          className="block w-full border-0 bg-transparent p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="Head of Tomfoolery"
        />
      </>
    );
  } else if (criteria.criteriaType === "BOOLEAN") {
    return (
      <>
        <label
          htmlFor={criteria.criteriaType}
          className="block text-xs font-medium text-gray-900"
        >
          {criteria.criteriaPrompt}
        </label>
        <input
          type="checkbox"
          name={criteria.criteriaType}
          id={criteria.criteriaId}
          checked={
            reportPageStore.getValueForKey(criteria.id) === "true"
              ? true
              : false
          }
          onChange={(e) => {
            const value = e.target.checked;
            reportPageStore.updateFormState(criteria.id, value.toString());
          }}
          className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="Head of Tomfoolery"
        />
      </>
    );
  }

  return <div>{criteria.criteriaType}</div>;
};

const RenderEvaluation: React.FC<RenderEvaluationProps> = ({ evaluation }) => {
  const reportPageStore = useReportPageStore();
  const setFormStateFromEvaluation = reportPageStore.setFormStateFromEvaluation;

  useEffect(() => {
    setFormStateFromEvaluation(evaluation);
  }, [evaluation, setFormStateFromEvaluation]);

  const formStateChangeHandler = (key: string, value: string) => {
    reportPageStore.updateFormState(key, value);
  };
  console.log("A", evaluation.criteriaValues);
  return (
    <div className="isolate mb-8 -space-y-px rounded-md shadow-sm">
      <div className="relative rounded-md rounded-b-none px-3 pt-2.5 pb-1.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
        <label
          htmlFor="name"
          className="block text-xs font-medium text-gray-900"
        >
          Student Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={(e) => {
            const value = e.target.value;
            formStateChangeHandler("name", value);
          }}
          value={reportPageStore.formState?.name?.value ?? ""}
          className="block w-full border-0 bg-transparent p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="Jane Smith"
        />
      </div>
      <div className="relative rounded-md rounded-t-none rounded-b-none px-3 pt-2.5 pb-1.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
        <label
          htmlFor="pronouns"
          className="block text-xs font-medium text-gray-900"
        >
          Pronouns
        </label>
        <input
          type="text"
          name="pronouns"
          id="pronouns"
          onChange={(e) => {
            const value = e.target.value;
            formStateChangeHandler("pronouns", value);
          }}
          value={reportPageStore.formState?.pronouns?.value ?? ""}
          className="block w-full border-0 bg-transparent p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="Head of Tomfoolery"
        />
      </div>

      {evaluation.criteriaValues.map((criteria, idx) => {
        return (
          <div
            key={criteria.id}
            className={`relative rounded-md rounded-t-none ${
              idx === evaluation.criteriaValues.length - 1
                ? ""
                : "rounded-b-none"
            } px-3 pt-2.5 pb-1.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600`}
          >
            <SpecialInput criteria={criteria} />
          </div>
        );
      })}
    </div>
  );
};

const ReportPageContent: React.FC<ReportPageContentProps> = ({ report }) => {
  const studentEvaluations = report?.studentEvaluation;

  const [currentEvaluationIndex, setCurrentEvaluationIndex] =
    useState<number>(0);

  const reportPageStore = useReportPageStore();

  const utils = trpc.useContext();

  // const comments = report?.comments;
  const tab = useReportPageStore((state) => state.tab);

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
      updateEvaluation({
        evaluationId: currentEvaluation.id,
        studentName: reportPageStore.getValueForKey("name"),
        studentPronouns: reportPageStore.getValueForKey("pronouns"),
        criteriaValues: Object.keys(reportPageStore.formState ?? {})
          .filter((v) => v !== "name" && v !== "pronouns")
          .map((key) => {
            return {
              id: key,
              value: reportPageStore.getValueForKey(key) ?? "",
              required: reportPageStore.getRequiredForKey(key) ?? false,
            };
          }),
      });
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

interface StudentListProps {
  evaluations: EvaluationType[];
  selectedEvaluation?: EvaluationType;
  setSelectedEvaluationIdx: Dispatch<SetStateAction<number>>;
}

//add a border around the current student loaded
const StudentList: React.FC<StudentListProps> = ({
  evaluations,
  selectedEvaluation,
  setSelectedEvaluationIdx,
}) => {
  return (
    <div>
      <h2 className="text-sm font-medium text-gray-500">Pinned Projects</h2>
      <ul
        role="list"
        className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2 xl:grid-cols-4"
      >
        {evaluations.map((evaluation, idx) => (
          <li
            key={evaluation.id}
            className="col-span-1 flex rounded-md shadow-sm"
          >
            <div
              className={classNames(
                "flex flex-1 cursor-pointer items-center justify-between truncate rounded-r-md rounded-l-md bg-white hover:bg-gray-50",
                evaluation.id === selectedEvaluation?.id
                  ? "border-2 border-green-500"
                  : "border border-gray-200",
              )}
              onClick={() => setSelectedEvaluationIdx(idx)}
            >
              <div className="flex-1 space-y-1 truncate px-4 py-2 text-sm">
                {evaluation.completed ? (
                  <div className="max-w-min rounded-md bg-green-500 p-1 text-xs font-bold text-white">
                    Complete
                  </div>
                ) : (
                  <div className="max-w-min rounded-md bg-gray-500 p-1 text-xs font-bold text-white">
                    Incomplete
                  </div>
                )}
                <div className="flex font-medium text-gray-900 hover:text-gray-600">
                  {evaluation.studentName}
                  &nbsp;
                  <p className="font-normal text-gray-500">
                    ({evaluation.studentPronouns})
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 pr-2">
                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Open options</span>
                  Edit
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportPageContent;
