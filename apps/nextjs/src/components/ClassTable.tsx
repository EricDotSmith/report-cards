import { AppRouter } from "@acme/api";
import { inferProcedureOutput } from "@trpc/server";
import DotLoader from "./DotLoader/DotLoader";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";
import { useState } from "react";
import Link from "next/link";

interface GroupProps {
  num: string;
  title: string;
  colorProfile: string;
}

const Group: React.FC<GroupProps> = ({ num, title, colorProfile }) => {
  return (
    <p
      className={`flex flex-row items-center space-x-1 truncate rounded-xl border p-1 text-xs font-medium shadow-inner ${colorProfile}`}
    >
      <span className="text-sm font-extrabold">{num}</span>
      <span className="font-light">{title}</span>
    </p>
  );
};

function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear().toString();

  return `${day} ${month}, ${year}`;
}

interface ClassTableProps {
  classes: inferProcedureOutput<AppRouter["class"]["classes"]>;
}

const ClassTable: React.FC<ClassTableProps> = ({ classes }) => {
  const router = useRouter();

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
    <div className="p-4">
      <div className="mt-10 mb-5 px-4 sm:mt-0 sm:flex-auto sm:px-0">
        <h1 className="text-xl font-semibold text-gray-900">Classes</h1>
        <p className="mt-2 text-sm text-gray-700">
          Here is a list of all of your classes. To see your progress reports,
          click on a class.
        </p>
      </div>
      <div className="sticky top-16 z-10 flex w-full justify-end rounded-tl-md rounded-tr-md bg-[#58c1fa] px-6 py-3 shadow">
        <div className="flex w-full items-center justify-between">
          <div className="text-base font-bold text-white">
            {classes.length} Classes
          </div>
          <button
            type="button"
            disabled={createClassClicked}
            onClick={handleCreateClass}
            className="block rounded-md bg-sky-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            {createClassClicked ? <DotLoader /> : "+ Class"}
          </button>
        </div>
      </div>
      {classes.length === 0 ? (
        <div className="flex w-full items-center justify-center rounded-bl-md rounded-br-md bg-sky-100  px-4 py-5 shadow-inner sm:p-6">
          no classes
        </div>
      ) : (
        <div className="grid rounded-bl-md rounded-br-md bg-white px-4 py-5 shadow sm:p-6">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {classes.map((currentClass) => (
              <li key={currentClass.id} className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <div className="hidden flex-row space-x-2 sm:flex">
                      <Group
                        num={currentClass._count.students.toString()}
                        title="Students"
                        colorProfile="shadow-pink-200/50 text-pink-500 bg-pink-100 border-pink-200"
                      />
                      <Group
                        num={currentClass._count.criteria.toString()}
                        title="Criteria"
                        colorProfile="shadow-orange-200/50 text-orange-500 bg-orange-100 border-orange-200"
                      />
                      <Group
                        num={currentClass._count.reports.toString()}
                        title="Reports"
                        colorProfile="shadow-orange-200/50 text-orange-500 bg-orange-100 border-orange-200"
                      />
                      <Group
                        num={formatDate(currentClass.createdAt)}
                        title=""
                        colorProfile="shadow-gray-200/50 text-gray-500 bg-gray-100 border-gray-200"
                      />
                    </div>
                    <div className="flex max-w-min flex-col space-y-2 sm:hidden">
                      <div className="flex space-x-2">
                        <Group
                          num={currentClass._count.students.toString()}
                          title="Students"
                          colorProfile="shadow-pink-200/50 text-pink-500 bg-pink-100 border-pink-200 max-w-min"
                        />
                        <Group
                          num={currentClass._count.criteria.toString()}
                          title="Criteria"
                          colorProfile="shadow-orange-200/50 text-orange-500 bg-orange-100 border-orange-200 max-w-min"
                        />
                        <Group
                          num={currentClass._count.reports.toString()}
                          title="Reports"
                          colorProfile="shadow-orange-200/50 text-orange-500 bg-orange-100 border-orange-200 max-w-min"
                        />
                      </div>
                      <div className="">
                        <Group
                          num={formatDate(currentClass.createdAt)}
                          title=""
                          colorProfile="shadow-gray-200/50 text-gray-500 bg-gray-100 border-gray-200 max-w-min"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Link
                      href={`/class/${currentClass.id}`}
                      className="text-sky-600 hover:text-sky-900"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClassTable;
