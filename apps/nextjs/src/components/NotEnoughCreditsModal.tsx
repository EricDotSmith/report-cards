import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment } from "react";

interface NotEnoughCreditsModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const NotEnoughCreditsModal: React.FC<NotEnoughCreditsModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const router = useRouter();

  const handleNavigateToAccountPage = () => {
    router.push("/account");
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
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
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Not enough credits
                </Dialog.Title>
                <div className="mt-2">
                  <div className="isolate -space-y-px rounded-md ">
                    Unfortunately, you seem to have run out of available report
                    credits. Please purchase more then try again.
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="block rounded-md bg-green-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:bg-green-300"
                    onClick={handleNavigateToAccountPage}
                  >
                    {"Go to account settings"}
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

export default NotEnoughCreditsModal;
