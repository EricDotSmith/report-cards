import { useUser } from "@clerk/nextjs";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { trpc } from "../../utils/trpc";
import DotLoader from "../DotLoader/DotLoader";

export const OnboardingModal: React.FC = () => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const utils = trpc.useContext();

  const createTeacherMutation = trpc.teacher.create.useMutation();

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleCreateFinishAccountCreation = () => {
    setLoading(true);
    createTeacherMutation.mutate(
      {
        id: user?.id ?? "",
        name: name,
        email: user?.primaryEmailAddress?.emailAddress ?? "",
      },
      {
        onSuccess: async () => {
          await utils.teacher.byId.invalidate();

          closeModal();
          setLoading(false);
        },
      },
    );
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        static
        as="div"
        className="relative z-10"
        onClose={() => {
          return;
        }}
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Welcome to Report Cards!
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Please enter your name to get started.
                  </p>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-lg border"
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    disabled={loading}
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={handleCreateFinishAccountCreation}
                  >
                    {loading ? (
                      <DotLoader color="bg-yellow-100" />
                    ) : (
                      "Got it, thanks!"
                    )}
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
