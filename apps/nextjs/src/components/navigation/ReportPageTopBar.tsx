import { AppRouter } from "@acme/api";
import { inferProcedureOutput } from "@trpc/server";
import useReportPageStore, { Tabs } from "../../store/reportPageStore";
import classNames from "../../utils/tailwind";

const tabs: { name: string; tab: Tabs }[] = [
  { name: "Student Evaluations", tab: "evaluation" },
  { name: "Report (Generated 12-12-2023)", tab: "report" }, //for this tab change it to click to generate report and show appropriate modal if not all students evaluated yet
];

interface ClassPageTopBarProps {
  report?: inferProcedureOutput<AppRouter["report"]["byId"]>;
}

const ClassPageTopBar: React.FC<ClassPageTopBarProps> = ({}) => {
  const changeTab = useReportPageStore((state) => state.changeTab);
  const currentTab = useReportPageStore((state) => state.tab);

  return (
    <div className="flex h-16 w-full justify-start bg-white shadow-sm">
      <nav
        className="flex h-full w-full divide-x divide-gray-200 shadow"
        aria-label="Tabs"
      >
        {tabs.map((tab, tabIdx) => (
          <button
            key={tab.name}
            onClick={() => {
              changeTab(tab.tab);
            }}
            className={classNames(
              tab.tab === currentTab
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700",
              "group relative flex w-full min-w-0 flex-1 items-center justify-center overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10",
            )}
          >
            <span>{tab.name}</span>
            <span
              aria-hidden="true"
              className={classNames(
                tab.tab === currentTab ? "bg-indigo-500" : "bg-transparent",
                "absolute inset-x-0 bottom-0 h-0.5",
              )}
            />
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ClassPageTopBar;
