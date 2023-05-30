import { Comment } from "@acme/db";

interface ReportCardProps {
  comment: Comment;
}

interface CompletionPrompt {
  studentId: string;
  studentName: string;
  studentPronouns: string;
  studentCriteriaEvaluations: {
    criteriaQuestion: string;
    teacherResponse: string;
  }[];
}

const ReportCard: React.FC<ReportCardProps> = ({ comment }) => {
  const {
    studentCriteriaEvaluations,
    studentId,
    studentName,
    studentPronouns,
  } = JSON.parse(comment.prompt) as CompletionPrompt;
  return (
    <div className="max-w-5xl overflow-hidden rounded-lg bg-white shadow">
      <div className="border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Full name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {studentName}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Pronouns</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {studentPronouns}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Comment</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {comment.comment}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Criteria
            </dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul
                role="list"
                className="divide-y divide-gray-100 rounded-md border border-gray-200"
              >
                {studentCriteriaEvaluations.map((criteriaEvaluation, idx) => (
                  <li
                    key={idx}
                    className="flex flex-col items-start justify-between py-4 pl-4 pr-5 text-sm leading-6"
                  >
                    <dt className="text-sm font-medium text-gray-900">
                      {criteriaEvaluation.criteriaQuestion}
                    </dt>
                    <dd className="mt-1 text-sm italic leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {criteriaEvaluation.teacherResponse.length > 0 ? (
                        criteriaEvaluation.teacherResponse
                      ) : (
                        <div className="italic text-gray-500">
                          No response provided.
                        </div>
                      )}
                    </dd>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default ReportCard;
