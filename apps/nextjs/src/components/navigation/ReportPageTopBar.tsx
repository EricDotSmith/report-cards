import { AppRouter } from "@acme/api";
import { inferProcedureOutput } from "@trpc/server";

interface ClassPageTopBarProps {
  report?: inferProcedureOutput<AppRouter["report"]["byId"]>;
}

const ClassPageTopBar: React.FC<ClassPageTopBarProps> = ({}) => {
  return (
    <div className="flex h-16 w-full justify-end bg-white px-4 shadow-sm">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center space-x-2"></div>
      </div>
    </div>
  );
};

export default ClassPageTopBar;
