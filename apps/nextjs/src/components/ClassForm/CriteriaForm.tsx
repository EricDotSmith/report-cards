import { Criteria } from "@acme/db";
import {
  TrashIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import AddCriteriaModal from "./AddCriteriaModal";
import DeleteCriteriaModal from "./DeleteCriteriaModal";
import EditCriteriaModal from "./EditCriteriaModal";
import EmptyCriteriaForm from "./EmptyCriteriaForm";

interface CriteriaFormProps {
  criteria?: Criteria[];
}

const CriteriaForm: React.FC<CriteriaFormProps> = ({ criteria }) => {
  const [addCriteriaModalOpen, setAddCriteriaModalOpen] = useState(false);
  const [editCriteriaModalOpen, setEditCriteriaModalOpen] = useState(false);
  const [deleteCriteriaModalOpen, setDeleteCriteriaModalOpen] = useState(false);
  const [criteriaToEdit, setCriteriaToEdit] = useState<Criteria | null>(null);

  const handleEditCriteriaClick = (criteria: Criteria) => {
    setCriteriaToEdit(criteria);
    setEditCriteriaModalOpen(true);
  };

  const handleDeleteCriteriaClick = (criteria: Criteria) => {
    setCriteriaToEdit(criteria);
    setDeleteCriteriaModalOpen(true);
  };

  return (
    <>
      <AddCriteriaModal
        isOpen={addCriteriaModalOpen}
        closeModal={() => setAddCriteriaModalOpen(false)}
      />
      {criteriaToEdit && (
        <EditCriteriaModal
          isOpen={editCriteriaModalOpen}
          closeModal={() => setEditCriteriaModalOpen(false)}
          criteria={criteriaToEdit}
        />
      )}
      {criteriaToEdit && (
        <DeleteCriteriaModal
          isOpen={deleteCriteriaModalOpen}
          closeModal={() => setDeleteCriteriaModalOpen(false)}
          criteria={criteriaToEdit}
        />
      )}
      <div className="sticky top-16 z-10 flex w-full justify-end bg-orange-200 px-6 py-3 shadow sm:rounded-tl-md sm:rounded-tr-md">
        <div className="flex w-full items-center justify-between">
          <div className="text-base font-bold text-orange-700">
            {criteria?.length ?? 0} Criteria
          </div>
          <button
            type="button"
            onClick={() => setAddCriteriaModalOpen(true)}
            className="block rounded-md bg-orange-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >
            + Criteria
          </button>
        </div>
      </div>
      {!criteria || criteria.length === 0 ? (
        <div className="flex w-full items-center justify-center bg-orange-100 px-4 py-5  shadow-inner sm:rounded-bl-md sm:rounded-br-md sm:p-6">
          <EmptyCriteriaForm />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 bg-orange-100 px-4 py-5  shadow-inner sm:grid-cols-2 sm:rounded-bl-md sm:rounded-br-md sm:p-6">
          {criteria.map((currentCriteria) => (
            <div
              key={currentCriteria.id}
              className="divide-y divide-gray-200 rounded-lg bg-white shadow"
            >
              <div className="flex w-full items-center justify-between space-x-6 p-3">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <span className="inline-block flex-shrink-0 font-bold text-orange-800">
                      {/* <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-800"> */}
                      {currentCriteria.type}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-sm text-gray-500">
                    {currentCriteria.value}
                  </p>
                </div>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="flex w-0 flex-1">
                    <button
                      onClick={() => handleEditCriteriaClick(currentCriteria)}
                      className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-2 text-sm font-medium text-gray-400 hover:text-gray-600"
                    >
                      <AdjustmentsHorizontalIcon
                        className="h-5 w-5 "
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  <div className="-ml-px flex w-0 flex-1">
                    <button
                      onClick={() => {
                        handleDeleteCriteriaClick(currentCriteria);
                      }}
                      className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-2 text-sm font-medium text-gray-400 hover:text-gray-600"
                    >
                      <TrashIcon className="h-5 w-5 " aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CriteriaForm;
