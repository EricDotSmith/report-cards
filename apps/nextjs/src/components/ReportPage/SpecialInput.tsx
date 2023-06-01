import Toggle from "./Toggle";
import StudentAssessmentRadioGroup, {
  StudentAssessmentRadioOption,
} from "./StudentAssessmentRadioGroup";
import { CriteriaValuePair } from "@acme/db";
import useReportPageStore from "../../store/reportPageStore";
import classNames from "../../utils/tailwind";
import { shallow } from "zustand/shallow";
import YesNoListBox from "./YesNoListBox";

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

  if (criteria.criteriaType === "COMMENT") {
    return (
      <>
        <label
          htmlFor={criteria.criteriaType}
          className={classNames(
            "block text-sm font-bold",
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
          maxLength={200}
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
            "block text-sm font-bold",
            requiredFieldsFilledMap?.get(criteria.id) === false
              ? "text-red-500"
              : "text-gray-900",
          )}
        >
          {criteria.criteriaPrompt}
        </label>
        <YesNoListBox
          type={(getValueForKey(criteria.id) as any) ?? ""}
          name={criteria.criteriaType}
          id={criteria.criteriaId}
          onChange={(value) => {
            updateFormState(criteria.id, value);
          }}
        />
        <div className="h-1 w-32"></div>
      </>
    );
  } else if (criteria.criteriaType === "ASSESSMENT") {
    //TODO: change this to toggle type
    return (
      <>
        <label
          htmlFor={criteria.criteriaType}
          className={classNames(
            "block text-sm font-bold",
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
