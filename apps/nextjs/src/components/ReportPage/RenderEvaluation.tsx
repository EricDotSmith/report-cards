import { useEffect } from "react";
import useReportPageStore, {
  EvaluationType,
} from "../../store/reportPageStore";
import SpecialInput from "./SpecialInput";
import classNames from "../../utils/tailwind";
import { shallow } from "zustand/shallow";

interface RenderEvaluationProps {
  evaluation: EvaluationType;
}

const RenderEvaluation: React.FC<RenderEvaluationProps> = ({ evaluation }) => {
  const {
    requiredFieldsFilledMap,
    setFormStateFromEvaluation,
    updateFormState,
    formState,
  } = useReportPageStore(
    (state) => ({
      requiredFieldsFilledMap: state.requiredFieldsFilledMap,
      setFormStateFromEvaluation: state.setFormStateFromEvaluation,
      updateFormState: state.updateFormState,
      formState: state.formState,
    }),
    shallow,
  );

  useEffect(() => {
    setFormStateFromEvaluation(evaluation);
  }, [evaluation, setFormStateFromEvaluation]);

  const formStateChangeHandler = (key: string, value: string) => {
    updateFormState(key, value);
  };

  return (
    <div className="isolate mb-4 -space-y-px rounded-md shadow-sm">
      <div className="relative rounded-md rounded-b-none px-3 pt-2.5 pb-1.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-orange-600">
        <label
          htmlFor="name"
          className={classNames(
            "block text-sm font-bold",
            requiredFieldsFilledMap?.get("name") === false
              ? "text-red-500"
              : "text-gray-900",
          )}
        >
          Student Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={(e) => {
            const value = e.target.value;
            formStateChangeHandler("name", value);
          }}
          value={formState?.name?.value ?? ""}
          className="block w-full border-0 bg-transparent p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="Jane Smith"
        />
      </div>
      <div className="relative rounded-md rounded-t-none rounded-b-none px-3 pt-2.5 pb-1.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-orange-600">
        <label
          htmlFor="pronouns"
          className={classNames(
            "block text-sm font-bold",
            requiredFieldsFilledMap?.get("pronouns") === false
              ? "text-red-500"
              : "text-gray-900",
          )}
        >
          Pronouns
        </label>
        <input
          type="text"
          name="pronouns"
          id="pronouns"
          onChange={(e) => {
            const value = e.target.value;
            formStateChangeHandler("pronouns", value);
          }}
          value={formState?.pronouns?.value ?? ""}
          className="block w-full border-0 bg-transparent p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="Head of Tomfoolery"
        />
      </div>

      {evaluation.criteriaValues.map((criteria, idx) => {
        return (
          <div
            key={criteria.id}
            className={`relative rounded-md rounded-t-none ${
              idx === evaluation.criteriaValues.length - 1
                ? ""
                : "rounded-b-none"
            } px-3 pt-2.5 pb-1.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-orange-600`}
          >
            <SpecialInput criteria={criteria} />
          </div>
        );
      })}

      {/* <div className="relative flex w-full justify-center rounded-md rounded-t-none px-3 pt-2.5 pb-1.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-orange-600">
        <button
          type="button"
          className="rounded-full bg-orange-600 p-2 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          <PlusIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div> */}
    </div>
  );
};

export default RenderEvaluation;
