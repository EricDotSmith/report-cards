export type StudentAssessmentRadioOption =
  | "Excellent"
  | "Good"
  | "Satisfactory"
  | "Needs Improvement";

const StudentAssessmentRadioOptions: StudentAssessmentRadioOption[] = [
  "Excellent",
  "Good",
  "Satisfactory",
  "Needs Improvement",
];

interface StudentAssessmentRadioGroupProps {
  name: string;
  id: string;
  selectedRadio?: StudentAssessmentRadioOption;
  setSelectedRadio: (selectedRadio: StudentAssessmentRadioOption) => void;
}

const StudentAssessmentRadioGroup: React.FC<
  StudentAssessmentRadioGroupProps
> = ({ name, id, selectedRadio, setSelectedRadio }) => {
  return (
    <div className="grid grid-cols-1 gap-2 p-2 sm:grid-cols-2 lg:grid-cols-4">
      {StudentAssessmentRadioOptions.map((option, idx) => (
        <div className="flex" key={option}>
          <input
            type="radio"
            name={`${name}-${id}-${idx}`}
            id={`${name}-${id}-${idx}`}
            className="mt-0.5 shrink-0 rounded-full border-gray-200 text-blue-600 focus:ring-blue-500"
            checked={selectedRadio === option}
            onChange={() => setSelectedRadio(option)}
          />
          <label
            htmlFor={`${name}-${id}-${idx}`}
            className="ml-2 text-sm text-gray-500 dark:text-gray-400"
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};

export default StudentAssessmentRadioGroup;
