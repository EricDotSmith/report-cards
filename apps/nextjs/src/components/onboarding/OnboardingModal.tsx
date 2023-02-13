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
  const [errorText, setErrorText] = useState("");

  const utils = trpc.useContext();

  const createTeacherMutation = trpc.teacher.create.useMutation();

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleCreateFinishAccountCreation = () => {
    const trimmedName = name.trim();
    if (trimmedName.length === 0) {
      setName("");
      setErrorText("Please enter a name");
    } else {
      setLoading(true);
      createTeacherMutation.mutate(
        {
          id: user?.id ?? "",
          name: trimmedName,
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
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        static
        as="div"
        className="relative z-50"
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
                  className="text-lg font-medium leading-6 text-sky-800"
                >
                  Welcome to Report Cards!
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-md text-gray-500">
                    Before we continue, please enter your name so we can
                    personalize your experience. This can be edited later in
                    settings.
                  </p>
                  <div className="mt-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-400"
                    >
                      Teachers Name
                    </label>
                    <input
                      type="text"
                      onChange={(e) => {
                        setName(e.target.value);
                        setErrorText("");
                      }}
                      value={name}
                      maxLength={50}
                      className="rounded-2xl border p-2 focus:border-sky-400 focus:outline-none focus:ring-sky-400"
                    />
                    {errorText.length > 0 && (
                      <p className="text-sm text-red-500">{errorText}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    disabled={loading}
                    className="inline-flex justify-center rounded-md border border-transparent bg-sky-100 px-4 py-2 text-sm font-medium text-sky-800 hover:bg-sky-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                    onClick={handleCreateFinishAccountCreation}
                  >
                    {loading ? (
                      <DotLoader color="bg-yellow-100" />
                    ) : (
                      "Get started generating reports!"
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
