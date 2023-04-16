import Toggle from "./Toggle";
import StudentAssessmentRadioGroup, {
  StudentAssessmentRadioOption,
} from "./StudentAssessmentRadioGroup";
import { CriteriaValuePair } from "@acme/db";
import useReportPageStore from "../../store/reportPageStore";
import classNames from "../../utils/tailwind";
import { shallow } from "zustand/shallow";

interface SpecialInputProps {
  criteria: CriteriaValuePair;
}

const SpecialInput: React.FC<SpecialInputProps> = ({ criteria }) => {
  const { requiredFieldsFilledMap, updateFormState, getValueForKey } =
    useReportPageStore(
      (state) => ({
        requiredFieldsFilledMap: state.requiredFieldsFilledMap,
        getValueForKey: state.getValueForKey,
        updateFormState: state.updateFormState,
      }),
      shallow,
    );

  console.log("::::", requiredFieldsFilledMap);
  //this shit appears to be broken
  if (criteria.criteriaType === "COMMENT") {
    return (
      <>
        <label
          htmlFor={criteria.criteriaType}
          className={classNames(
            "block text-xs font-medium",
            requiredFieldsFilledMap?.get(criteria.id) === false
              ? "text-red-500"
              : "text-gray-900",
          )}
        >
          {criteria.criteriaPrompt}
        </label>
        <textarea
          name={criteria.criteriaType}
          id={criteria.criteriaId}
          value={getValueForKey(criteria.id) ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            updateFormState(criteria.id, value);
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
          className={classNames(
            "block text-xs font-medium",
            requiredFieldsFilledMap?.get(criteria.id) === false
              ? "text-red-500"
              : "text-gray-900",
          )}
        >
          {criteria.criteriaPrompt}
        </label>
        <Toggle
          name={criteria.criteriaType}
          id={criteria.criteriaId}
          enabled={getValueForKey(criteria.id) === "true" ? true : false}
          setEnabled={(enabled) => {
            updateFormState(criteria.id, enabled.toString());
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
          className={classNames(
            "block text-xs font-medium",
            requiredFieldsFilledMap?.get(criteria.id) === false
              ? "text-red-500"
              : "text-gray-900",
          )}
        >
          {criteria.criteriaPrompt}
        </label>
        <StudentAssessmentRadioGroup
          name={criteria.criteriaType}
          id={criteria.criteriaId}
          setSelectedRadio={(option) => {
            updateFormState(criteria.id, option);
          }}
          selectedRadio={
            getValueForKey(criteria.id) as StudentAssessmentRadioOption
          }
        />
      </>
    );
  }

  return <div>{criteria.criteriaType}</div>;
};

export default SpecialInput;
