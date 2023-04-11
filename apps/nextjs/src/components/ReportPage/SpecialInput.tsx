import Toggle from "./Toggle";
import StudentAssessmentRadioGroup, {
  StudentAssessmentRadioOption,
} from "./StudentAssessmentRadioGroup";
import { CriteriaValuePair } from "@acme/db";
import useReportPageStore from "../../store/reportPageStore";

interface SpecialInputProps {
  criteria: CriteriaValuePair;
}

const SpecialInput: React.FC<SpecialInputProps> = ({ criteria }) => {
  const reportPageStore = useReportPageStore();

  if (criteria.criteriaType === "COMMENT") {
    return (
      <>
        <label
          htmlFor={criteria.criteriaType}
          className="block text-xs font-medium text-gray-900"
        >
          {criteria.criteriaPrompt}
        </label>
        <textarea
          name={criteria.criteriaType}
          id={criteria.criteriaId}
          value={reportPageStore.getValueForKey(criteria.id) ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            reportPageStore.updateFormState(criteria.id, value);
          }}
          rows={3}
          className="block w-full border-0 bg-transparent p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="Please enter the criteria prompt here."
        />
      </>
    );
  } else if (criteria.criteriaType === "BOOLEAN") {
    //TODO: change this to toggle type
    return (
      <>
        <label
          htmlFor={criteria.criteriaType}
          className="block pb-1 text-xs font-medium text-gray-900"
        >
          {criteria.criteriaPrompt}
        </label>
        <Toggle
          name={criteria.criteriaType}
          id={criteria.criteriaId}
          enabled={
            reportPageStore.getValueForKey(criteria.id) === "true"
              ? true
              : false
          }
          setEnabled={(enabled) => {
            reportPageStore.updateFormState(criteria.id, enabled.toString());
          }}
        />
      </>
    );
  } else if (criteria.criteriaType === "ASSESSMENT") {
    //TODO: change this to toggle type
    return (
      <>
        <label
          htmlFor={criteria.criteriaType}
          className="block pb-1 text-xs font-medium text-gray-900"
        >
          {criteria.criteriaPrompt}
        </label>
        <StudentAssessmentRadioGroup
          name={criteria.criteriaType}
          id={criteria.criteriaId}
          setSelectedRadio={(option) => {
            reportPageStore.updateFormState(criteria.id, option);
          }}
          selectedRadio={
            reportPageStore.getValueForKey(
              criteria.id,
            ) as StudentAssessmentRadioOption
          }
        />
      </>
    );
  }

  return <div>{criteria.criteriaType}</div>;
};

export default SpecialInput;
