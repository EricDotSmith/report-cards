import { Student } from "@acme/db";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { trpc } from "../../utils/trpc";
import DotLoader from "../DotLoader/DotLoader";

interface DeleteStudentModalProps {
  isOpen: boolean;
  closeModal: () => void;
  student: Student;
}

const DeleteStudentModal: React.FC<DeleteStudentModalProps> = ({
  isOpen,
  closeModal,
  student,
}) => {
  const router = useRouter();
  const { classId } = router.query;

  const utils = trpc.useContext();

  const { mutate, isLoading } = trpc.student.delete.useMutation({
    async onSuccess(data) {
      utils.class.byId.setData(classId as string, (old) => {
        if (old) {
          return {
            ...old,
            students: old.students.filter((c) => c.id !== data.id),
          };
        }
      });

      closeModal();
    },
  });

  const handleDeleteClick = () => {
    mutate({
      studentId: student.id,
    });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={
          !isLoading
            ? closeModal
            : () => {
                return;
              }
        }
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-[#f6f3ec] p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-sky-900"
                >
                  Delete student
                </Dialog.Title>
                <div className="mt-2">
                  Are you sure you want to delete this student?
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    disabled={isLoading}
                    className="block rounded-md bg-red-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:bg-red-300"
                    onClick={handleDeleteClick}
                  >
                    {isLoading ? <DotLoader /> : "Delete"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DeleteStudentModal;
