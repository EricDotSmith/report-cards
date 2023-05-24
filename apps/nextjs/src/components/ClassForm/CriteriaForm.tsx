import { Criteria, CriteriaType } from "@acme/db";
import {
  TrashIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import AddCriteriaModal from "./AddCriteriaModal";
import DeleteCriteriaModal from "./DeleteCriteriaModal";
import EditCriteriaModal from "./EditCriteriaModal";
import EmptyCriteriaForm from "./EmptyCriteriaForm";

const criteriaLabelFromType = (criteria: CriteriaType): string => {
  if (criteria === "BOOLEAN") {
    return "Yes / No";
  } else if (criteria === "ASSESSMENT") {
    return "Performance Assessment";
  } else if (criteria === "COMMENT") {
    return "Comment";
  }

  return "";
};

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
      <div className="sticky top-16 z-10 flex w-full justify-end rounded-tl-md rounded-tr-md bg-orange-200 px-6 py-3 shadow">
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
        <div className="flex w-full items-center justify-center rounded-bl-md rounded-br-md bg-orange-100 px-4 py-5 shadow-inner sm:p-6">
          <EmptyCriteriaForm />
        </div>
      ) : (
        <div className="grid rounded-bl-md rounded-br-md bg-white px-4 py-5 shadow sm:p-6">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {criteria.map((currentCriteria) => (
              <li key={currentCriteria.id} className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {criteriaLabelFromType(currentCriteria.type)}
                      </p>
                      {currentCriteria.required ? (
                        <span className="truncate rounded-md bg-green-400 p-1 text-sm text-green-900">
                          Required
                        </span>
                      ) : null}
                    </div>
                    <p className="truncate text-sm text-gray-500">
                      {currentCriteria.value}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditCriteriaClick(currentCriteria)}
                      className="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50"
                    >
                      <AdjustmentsHorizontalIcon
                        className="h-5 w-5 "
                        aria-hidden="true"
                      />
                    </button>
                    <button
                      onClick={() => {
                        handleDeleteCriteriaClick(currentCriteria);
                      }}
                      className="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50"
                    >
                      <TrashIcon className="h-5 w-5 " aria-hidden="true" />
                    </button>
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

export default CriteriaForm;
