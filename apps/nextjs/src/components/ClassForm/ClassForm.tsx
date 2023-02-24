import { AppRouter } from "@acme/api";
import { inferProcedureOutput } from "@trpc/server";
import CriteriaForm from "./CriteriaForm";
import SectionCard from "./SectionCard";

interface ClassFormProps {
  classData: inferProcedureOutput<AppRouter["class"]["byId"]>;
}

const ClassForm: React.FC<ClassFormProps> = ({ classData }) => {
  const criteria = classData?.criteria;
  const students = classData?.students;

  return (
    <div className="sm:p-4">
      <SectionCard
        title="Criteria Templates"
        description="Decide which criteria templates you'd like to add to this class."
      >
        <CriteriaForm criteria={criteria} />
      </SectionCard>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <SectionCard
        title="Students"
        description="Decide which students you'd like to add to this class."
      >
        {students?.length === 0 ? <p>No students</p> : null}
      </SectionCard>
    </div>
  );
};

export default ClassForm;
