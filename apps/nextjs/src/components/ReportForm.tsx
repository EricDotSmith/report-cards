import { Report } from "@acme/db";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { trpc } from "../utils/trpc";
import EmptyReportForm from "./ClassForm/EmptyReportForm";
import DotLoader from "./DotLoader/DotLoader";
import GenericInfoModal from "./GenericInfoModal";

interface ReportFormProps {
  reports?: Report[];
  criteriaCount?: number;
  studentCount?: number;
}

const ReportForm: React.FC<ReportFormProps> = ({
  reports,
  criteriaCount,
  studentCount,
}) => {
  const router = useRouter();
  const { classId } = router.query;

  const [createReportClicked, setCreateReportClicked] = useState(false);
  const [showNeedsMoreInfoModal, setShowNeedsMoreInfoModal] = useState(false);

  const { mutate: createReport } = trpc.report.create.useMutation({
    onSuccess: ({ id }) => {
      router.push(`/report/${id}`);
    },
    onError: () => {
      setCreateReportClicked(false);
    },
  });

  const handleCreateReport = () => {
    if (studentCount === 0 || criteriaCount === 0) {
      setShowNeedsMoreInfoModal(true);
    } else {
      if (!createReportClicked) {
        setCreateReportClicked(true);
        createReport({ classId: classId as string });
      }
    }
  };

  return (
    <>
      <GenericInfoModal
        isOpen={showNeedsMoreInfoModal}
        closeModal={() => setShowNeedsMoreInfoModal(false)}
        modalTitleText="Needs more criteria or students"
        modalBodyText="You need at least one criteria and one student to start a report."
        modalButtonText="Continue"
      />
      <div className="sticky top-16 z-10 flex w-full justify-end rounded-tl-md rounded-tr-md bg-purple-200 px-6 py-3 shadow">
        <div className="flex w-full items-center justify-between">
          <div className="text-base font-bold text-purple-700">
            {reports?.length ?? 0} Reports
          </div>
          <button
            type="button"
            disabled={createReportClicked}
            onClick={handleCreateReport}
            className="block rounded-md bg-purple-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
          >
            {createReportClicked ? <DotLoader /> : "+ Report"}
          </button>
        </div>
      </div>
      {!reports || reports.length === 0 ? (
        <div className="flex w-full items-center justify-center rounded-bl-md rounded-br-md bg-purple-100 px-4 py-5 shadow sm:p-6">
          <EmptyReportForm />
        </div>
      ) : (
        <div className="grid rounded-bl-md rounded-br-md bg-white px-4 py-5 shadow sm:p-6">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {reports.map((report) => (
              <li key={report.id} className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    {report.reportGenerated ? (
                      <p className="max-w-min truncate rounded bg-green-400 p-1 text-sm font-medium text-green-900">
                        Status: Complete
                      </p>
                    ) : (
                      <p className="max-w-min truncate rounded bg-yellow-400 p-1 text-sm font-medium text-yellow-900">
                        Status: In-Progress
                      </p>
                    )}
                    <p className="truncate text-sm text-gray-500">
                      Created:&nbsp;
                      {report.createdAt.toLocaleString().split(",")[0]}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/report/${report.id}`}
                      className="text-sky-600 hover:text-sky-900"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ReportForm;
