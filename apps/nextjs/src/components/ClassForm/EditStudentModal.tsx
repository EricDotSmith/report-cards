import { Student } from "@acme/db";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";
import DotLoader from "../DotLoader/DotLoader";

interface EditStudentModalProps {
  isOpen: boolean;
  closeModal: () => void;
  student: Student;
}

const EditStudentModal: React.FC<EditStudentModalProps> = ({
  isOpen,
  closeModal,
  student,
}) => {
  const [name, setName] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const { classId } = router.query;

  useEffect(() => {
    if (isOpen) {
      setName(student.name);
      setPronouns(student.pronouns);
      setErrorMessage("");
    }
  }, [setName, setPronouns, isOpen, student.name, student.pronouns]);

  const utils = trpc.useContext();

  const { mutate, isLoading } = trpc.student.update.useMutation({
    async onSuccess(data) {
      utils.class.byId.setData(classId as string, (old) => {
        if (old) {
          return {
            ...old,
            students: old.students.map((currentStudent) => {
              if (currentStudent.id === data.id) {
                return {
                  ...currentStudent,
                  name: data.name,
                  pronouns: data.pronouns,
                };
              }

              return currentStudent;
            }),
          };
        }
      });

      closeModal();
    },
    onError(error, variables, context) {
      setErrorMessage(error.message);
    },
  });

  const handleEditClick = () => {
    mutate({
      name,
      pronouns,
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
                  Edit student
                </Dialog.Title>
                <div className="mt-2">
                  <div className="isolate -space-y-px rounded-md shadow-sm">
                    <div className="relative rounded-md rounded-b-none border border-gray-300 px-3 py-2 focus-within:z-10 focus-within:border-sky-600 focus-within:ring-1 focus-within:ring-sky-600">
                      <label
                        htmlFor="name"
                        className="block text-xs font-medium text-gray-900"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        maxLength={50}
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full border-0 bg-transparent p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                        placeholder="Please enter the students name here."
                      />
                    </div>
                    <div className="relative rounded-md rounded-t-none border border-gray-300 px-3 py-2 focus-within:z-10 focus-within:border-sky-600 focus-within:ring-1 focus-within:ring-sky-600">
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
                        maxLength={20}
                        value={pronouns}
                        onChange={(e) => setPronouns(e.target.value)}
                        className="block w-full border-0 bg-transparent p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                        placeholder="Please enter the students pronouns here."
                      />
                    </div>
                  </div>
                </div>

                {errorMessage.length > 0 && (
                  <div className="mt-4 rounded-lg bg-red-200 p-2 text-red-800">
                    {errorMessage}
                  </div>
                )}

                <div className="mt-4">
                  <button
                    type="button"
                    disabled={
                      isLoading || name.length === 0 || pronouns.length === 0
                    }
                    className="block rounded-md bg-sky-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:bg-sky-300"
                    onClick={handleEditClick}
                  >
                    {isLoading ? <DotLoader /> : "Save"}
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

export default EditStudentModal;
