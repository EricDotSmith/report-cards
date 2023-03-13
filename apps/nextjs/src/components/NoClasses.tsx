import { PlusIcon } from "@heroicons/react/20/solid";
import router from "next/router";
import { useState } from "react";
import { trpc } from "../utils/trpc";
import DotLoader from "./DotLoader/DotLoader";

const NoClasses = () => {
  const [createClassClicked, setCreateClassClicked] = useState(false);

  const { mutate: createClass } = trpc.class.create.useMutation({
    onSuccess: ({ id }) => {
      router.push(`/class/${id}`);
    },
    onError: () => {
      setCreateClassClicked(false);
    },
  });

  const handleCreateClass = () => {
    if (!createClassClicked) {
      setCreateClassClicked(true);
      createClass();
    }
  };

  return (
    <div className="p-4 text-center">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-gray-900">No classes</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new class.
      </p>
      <div className="mt-6">
        <button
          type="button"
          disabled={createClassClicked}
          onClick={handleCreateClass}
          className="inline-flex items-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        >
          {createClassClicked ? (
            <DotLoader />
          ) : (
            <>
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              New Class
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default NoClasses;
