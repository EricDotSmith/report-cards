import { Criteria, CriteriaType } from "@acme/db";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";
import DotLoader from "../DotLoader/DotLoader";
import CriteriaTypeListBox from "./CriteriaTypeListBox";

interface EditCriteriaModalProps {
  isOpen: boolean;
  closeModal: () => void;
  criteria: Criteria;
}

const EditCriteriaModal: React.FC<EditCriteriaModalProps> = ({
  isOpen,
  closeModal,
  criteria,
}) => {
  const [type, setType] = useState<CriteriaType>(criteria.type);
  const [prompt, setPrompt] = useState(criteria.value);

  const router = useRouter();
  const { classId } = router.query;

  useEffect(() => {
    if (isOpen) {
      setType(criteria.type);
      setPrompt(criteria.value);
    }
  }, [setType, setPrompt, isOpen, criteria.type, criteria.value]);

  const utils = trpc.useContext();

  const { mutate, isLoading } = trpc.criteria.update.useMutation({
    async onSuccess(data) {
      utils.class.byId.setData(classId as string, (old) => {
        if (old) {
          return {
            ...old,
            criteria: old.criteria.map((currentCriteria) => {
              if (currentCriteria.id === data.id) {
                return {
                  ...currentCriteria,
                  value: data.value,
                  type: data.type,
                };
              }

              return currentCriteria;
            }),
          };
        }
      });

      closeModal();
    },
  });

  const handleEditClick = () => {
    mutate({
      type,
      value: prompt,
      criteriaId: criteria.id,
    });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={!isLoading ? closeModal : () => {}}
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
                  className="text-lg font-medium leading-6 text-orange-900"
                >
                  Edit criteria
                </Dialog.Title>
                <div className="mt-2">
                  <div className="isolate -space-y-px rounded-md shadow-sm">
                    <div className="relative rounded-md rounded-b-none border border-gray-300 px-3 py-2 focus-within:z-10 focus-within:border-orange-600 focus-within:ring-1 focus-within:ring-orange-600">
                      <label
                        htmlFor="type"
                        className="block text-xs font-medium text-gray-900"
                      >
                        Criteria Type
                      </label>
                      <CriteriaTypeListBox
                        onChange={(v) => setType(v)}
                        type={criteria.type}
                      />
                    </div>
                    <div className="relative rounded-md rounded-t-none border border-gray-300 px-3 py-2 focus-within:z-10 focus-within:border-orange-600 focus-within:ring-1 focus-within:ring-orange-600">
                      <label
                        htmlFor="prompt"
                        className="block text-xs font-medium text-gray-900"
                      >
                        Criteria Prompt
                      </label>
                      <textarea
                        name="prompt"
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        rows={3}
                        className="block w-full resize-none border-0 bg-transparent p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                        placeholder="Please enter the criteria prompt here."
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    disabled={isLoading || prompt.length === 0}
                    className="block rounded-md bg-orange-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 disabled:bg-orange-300"
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

export default EditCriteriaModal;