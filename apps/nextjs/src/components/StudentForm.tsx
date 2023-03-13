import { Student } from "@acme/db";
import { useState } from "react";
import AddStudentModal from "./ClassForm/AddStudentModal";
import DeleteStudentModal from "./ClassForm/DeleteStudentModal";
import EditStudentModal from "./ClassForm/EditStudentModal";
import EmptyStudentForm from "./ClassForm/EmptyStudentForm";
import {
  TrashIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";

interface StudentFormProps {
  students?: Student[];
}

const StudentForm: React.FC<StudentFormProps> = ({ students }) => {
  const [addStudentModalOpen, setAddStudentModalOpen] = useState(false);
  const [editStudentModalOpen, setEditStudentModalOpen] = useState(false);
  const [deleteStudentModalOpen, setDeleteStudentModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);

  const handleEditStudentClick = (student: Student) => {
    setStudentToEdit(student);
    setEditStudentModalOpen(true);
  };

  const handleDeleteCriteriaClick = (student: Student) => {
    setStudentToEdit(student);
    setDeleteStudentModalOpen(true);
  };

  return (
    <>
      <AddStudentModal
        isOpen={addStudentModalOpen}
        closeModal={() => setAddStudentModalOpen(false)}
      />
      {studentToEdit && (
        <EditStudentModal
          isOpen={editStudentModalOpen}
          closeModal={() => setEditStudentModalOpen(false)}
          student={studentToEdit}
        />
      )}
      {studentToEdit && (
        <DeleteStudentModal
          isOpen={deleteStudentModalOpen}
          closeModal={() => setDeleteStudentModalOpen(false)}
          student={studentToEdit}
        />
      )}
      <div className="sticky top-16 z-10 flex w-full justify-end rounded-tl-md rounded-tr-md bg-sky-200 px-6 py-3 shadow">
        <div className="flex w-full items-center justify-between">
          <div className="text-base font-bold text-sky-700">
            {students?.length ?? 0} Students
          </div>
          <button
            type="button"
            onClick={() => setAddStudentModalOpen(true)}
            className="block rounded-md bg-sky-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            + Student
          </button>
        </div>
      </div>
      {!students || students.length === 0 ? (
        <div className="flex w-full items-center justify-center rounded-bl-md rounded-br-md bg-transparent px-4 py-5 shadow sm:p-6">
          <EmptyStudentForm />
        </div>
      ) : (
        <div className="grid rounded-bl-md rounded-br-md bg-white px-4 py-5 shadow sm:p-6">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {students.map((student) => (
              <li key={student.id} className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {student.name}
                    </p>
                    <p className="truncate text-sm text-gray-500">
                      {student.pronouns}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditStudentClick(student)}
                      className="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50"
                    >
                      <AdjustmentsHorizontalIcon
                        className="h-5 w-5 "
                        aria-hidden="true"
                      />
                    </button>
                    <button
                      onClick={() => handleDeleteCriteriaClick(student)}
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

export default StudentForm;
