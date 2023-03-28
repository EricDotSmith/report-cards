import { AppRouter } from "@acme/api";
import { CriteriaValuePair, StudentEvaluation } from "@acme/db";
import { inferProcedureOutput } from "@trpc/server";
import useReportPageStore from "../../store/reportPageStore";

interface ReportPageContentProps {
  report: inferProcedureOutput<AppRouter["report"]["byId"]>;
}

interface RenderEvaluationProps {
  evaluation: StudentEvaluation & {
    criteriaValues: CriteriaValuePair[];
  };
}

const RenderEvaluation: React.FC<RenderEvaluationProps> = ({ evaluation }) => {
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
          className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="Jane Smith"
        />
      </div>
      <div className="relative rounded-md rounded-t-none rounded-b-none px-3 pt-2.5 pb-1.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
        <label
          htmlFor="job-title"
          className="block text-xs font-medium text-gray-900"
        >
          Pronouns
        </label>
        <input
          type="text"
          name="job-title"
          id="job-title"
          className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
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
            <label
              htmlFor={criteria.criteriaType}
              className="block text-xs font-medium text-gray-900"
            >
              {criteria.criteriaPrompt}
            </label>
            <input
              type="text"
              name={criteria.criteriaType}
              id={criteria.criteriaType}
              className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Head of Tomfoolery"
            />
          </div>
        );
      })}
    </div>
  );
};

const ReportPageContent: React.FC<ReportPageContentProps> = ({ report }) => {
  const studentEvaluations = report?.studentEvaluation;
  const comments = report?.comments;
  const tab = useReportPageStore((state) => state.tab);

  return (
    <>
      {tab === "evaluation" ? (
        <>
          <div className="sticky top-16 z-10 flex h-12 items-center justify-between bg-white px-4">
            <span>Hi</span>
            <div>Generate</div>
          </div>
          <div className="p-4 md:px-32">
            {studentEvaluations?.map((studentEvaluation) => {
              return (
                <RenderEvaluation
                  key={studentEvaluation.id}
                  evaluation={studentEvaluation}
                />
              );
            })}
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
