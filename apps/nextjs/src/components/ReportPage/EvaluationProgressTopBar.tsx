import React from "react";
import { EvaluationType } from "../../store/reportPageStore";

interface EvaluationProgressTopBarProps {
  evaluations?: EvaluationType[];
}

const EvaluationProgressTopBar: React.FC<EvaluationProgressTopBarProps> = ({
  evaluations,
}) => {
  const totalStudentEvaluations = evaluations?.length ?? 0;
  const totalCompletedStudentEvaluations =
    evaluations?.filter((evaluation) => evaluation.completed).length ?? 0;
  const percentComplete =
    totalCompletedStudentEvaluations / totalStudentEvaluations;

  return (
    <div className="sticky top-16 z-10 flex flex-col items-center space-y-2 bg-white p-2 px-2 shadow">
      {percentComplete === 1 ? (
        <>
          <div>Evaluation Completed</div>
          <button
            type="button"
            className="inline-flex items-center gap-x-2 rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            <svg
              className="-ml-0.5 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
            Generate Report
          </button>
        </>
      ) : (
        <>
          <div>Evaluation Progress</div>
          <div className="flex h-6 w-full overflow-hidden rounded-full bg-gray-200">
            {totalCompletedStudentEvaluations === 0 ? (
              <div
                className={`flex w-full flex-col justify-center overflow-hidden bg-gray-200 text-center text-xs text-gray-900`}
                role="progressbar"
              >
                {`${totalCompletedStudentEvaluations}/${totalStudentEvaluations}`}
              </div>
            ) : (
              <div
                className={`flex flex-col justify-center overflow-hidden ${
                  percentComplete === 1 ? "bg-green-500" : "bg-blue-500"
                } text-center text-xs text-white`}
                role="progressbar"
                style={{
                  width: `${percentComplete * 100}%`,
                }}
              >
                {`${totalCompletedStudentEvaluations}/${totalStudentEvaluations}`}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default EvaluationProgressTopBar;
