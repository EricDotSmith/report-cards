import { AppRouter } from "@acme/api";
import { inferProcedureOutput } from "@trpc/server";

interface ClassPageTopBarProps {
  currentClass?: inferProcedureOutput<AppRouter["class"]["byId"]>;
}

const ClassPageTopBar: React.FC<ClassPageTopBarProps> = ({}) => {
  const handleScrollToClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const rect = element.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const offsetTop = rect.top + scrollTop - 64; //height of top bar
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <div className="flex h-16 w-full justify-end bg-white px-4 shadow-sm">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleScrollToClick("criteria_form")}
            className={`flex cursor-pointer select-none flex-col items-center rounded-lg bg-orange-600 p-2 text-xs font-bold text-white hover:bg-orange-500`}
          >
            <span>Criteria</span>
          </button>
          <button
            onClick={() => handleScrollToClick("student_form")}
            className={`flex cursor-pointer select-none flex-col items-center rounded-lg bg-sky-600 p-2 text-xs font-bold text-white hover:bg-sky-500`}
          >
            <span>Students</span>
          </button>
          <button
            onClick={() => handleScrollToClick("report_form")}
            className={`flex cursor-pointer select-none flex-col items-center rounded-lg bg-green-600 p-2 text-xs font-bold text-white hover:bg-green-500`}
          >
            <span>Reports</span>
          </button>
        </div>
        <div className="flex w-full items-center justify-center">
          <hr className="mr-1 flex-grow border-t border-gray-300" />
          <span className="text-xs font-normal text-gray-700">Quick Links</span>
          <hr className="ml-1 flex-grow border-t border-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default ClassPageTopBar;
