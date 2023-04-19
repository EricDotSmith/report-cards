import { AppRouter } from "@acme/api";
import { inferProcedureOutput } from "@trpc/server";

interface GeneratedReportContentProps {
  report: inferProcedureOutput<AppRouter["report"]["byId"]>;
}

const GeneratedReportContent: React.FC<GeneratedReportContentProps> = ({
  report,
}) => {
  return (
    <div>
      {report?.comments.map((comment) => (
        <div key={comment.id} className="pb-2">
          {comment.comment}
        </div>
      ))}
    </div>
  );
};

export default GeneratedReportContent;
