import { Dispatch, SetStateAction } from "react";
import { EvaluationType } from "../../store/reportPageStore";
import classNames from "../../utils/tailwind";
import React from "react";

interface StudentListProps {
  evaluations: EvaluationType[];
  selectedEvaluation?: EvaluationType;
  setSelectedEvaluationIdx: Dispatch<SetStateAction<number>>;
}

//TODO: add a border around the current student loaded
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

export default StudentList;
