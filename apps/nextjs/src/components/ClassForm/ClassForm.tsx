import { AppRouter } from "@acme/api";
import { inferProcedureOutput } from "@trpc/server";
import ReportForm from "../ReportForm";
import StudentForm from "../StudentForm";
import CriteriaForm from "./CriteriaForm";
import SectionCard from "./SectionCard";

interface ClassFormProps {
  classData: inferProcedureOutput<AppRouter["class"]["byId"]>;
}

const ClassForm: React.FC<ClassFormProps> = ({ classData }) => {
  const criteria = classData?.criteria;
  const students = classData?.students;
  const reports = classData?.reports;

  return (
    <div className="p-4">
      <SectionCard
        title="Criteria Templates"
        description="Decide which criteria templates you'd like to add to this class."
        id="criteria_form"
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
        id="student_form"
      >
        <StudentForm students={students} />
      </SectionCard>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <SectionCard
        title="Reports"
        description="Decide which reports you'd like to add to this class."
        id="report_form"
      >
        <ReportForm
          criteriaCount={criteria?.length}
          studentCount={students?.length}
          reports={reports}
        />
      </SectionCard>

      <div className="mb-12"></div>
    </div>
  );
};

export default ClassForm;
