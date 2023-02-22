import {
  TrashIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  // More people...
];

const CriteriaForm: React.FC = () => {
  return (
    <>
      <div className="sticky top-16 z-10 flex w-full justify-end bg-orange-200 px-6 py-3 shadow sm:rounded-tl-md sm:rounded-tr-md">
        <button
          type="button"
          className="block rounded-md bg-orange-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          + Criteria
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 bg-orange-100 px-4 py-5  shadow-inner sm:grid-cols-2 sm:rounded-bl-md sm:rounded-br-md sm:p-6">
        {people.map((person) => (
          <div
            key={person.email}
            className="divide-y divide-gray-200 rounded-lg bg-white shadow"
          >
            <div className="flex w-full items-center justify-between space-x-6 p-3">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <span className="inline-block flex-shrink-0 font-bold text-orange-800">
                    {/* <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-800"> */}
                    {person.role}
                  </span>
                </div>
                <p className="mt-1 truncate text-sm text-gray-500">
                  {person.title}
                </p>
              </div>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <a
                    href={`mailto:${person.email}`}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                  >
                    <AdjustmentsHorizontalIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </a>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <a
                    href={`#`}
                    className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                  >
                    <TrashIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CriteriaForm;
