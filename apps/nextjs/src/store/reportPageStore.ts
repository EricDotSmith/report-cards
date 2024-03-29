// store/store.js
import { CriteriaValuePair, StudentEvaluation } from "@acme/db";
import { create } from "zustand";

export type EvaluationType = StudentEvaluation & {
  criteriaValues: CriteriaValuePair[];
};

type FormStateType = {
  [id: string]: {
    type: string;
    value: string;
    required: boolean;
    prompt: string;
  };
};

const initializeFormState = (evaluation: EvaluationType) => {
  const formState: FormStateType = {
    name: {
      type: "text",
      value: evaluation.studentName,
      required: true,
      prompt: "",
    },
    pronouns: {
      type: "text",
      value: evaluation.studentPronouns,
      required: true,
      prompt: "",
    },
  };

  evaluation.criteriaValues.forEach((criteria) => {
    formState[criteria.id] = {
      type: criteria.criteriaType,
      value: criteria.criteriaValue,
      required: criteria.required,
      prompt: criteria.criteriaPrompt,
    };
  });

  return formState;
};

interface ReportPageStore {
  formState: FormStateType | undefined;
  updateFormState: (key: string, value: string) => void;
  setFormStateFromEvaluation: (evaluation: EvaluationType) => void;
  getValueForKey: (key: string) => string | undefined;
  getRequiredForKey: (key: string) => boolean | undefined;
  getTypeForKey: (key: string) => string | undefined;
  getPromptForKey: (key: string) => string | undefined;
  checkIfRequiredFieldsAreFilled: () => boolean;
  requiredFieldsFilledMap: Map<string, boolean> | undefined;
}
// create store
const useReportPageStore = create<ReportPageStore>((set, get) => ({
  formState: undefined,
  requiredFieldsFilledMap: undefined,
  getValueForKey: (key: string) => {
    return get().formState?.[key]?.value;
  },
  getRequiredForKey: (key: string) => {
    return get().formState?.[key]?.required;
  },
  getTypeForKey: (key: string) => {
    return get().formState?.[key]?.type;
  },
  getPromptForKey: (key: string) => {
    return get().formState?.[key]?.prompt;
  },
  updateFormState: (key: string, value: string) => {
    set((state) => ({
      formState: {
        ...state.formState,
        [key]: {
          type: state.formState?.[key]?.type ?? "",
          value,
          required: state.formState?.[key]?.required ?? false,
          prompt: state.formState?.[key]?.prompt ?? "",
        },
      },
    }));
  },
  checkIfRequiredFieldsAreFilled: () => {
    const formState = get().formState;

    if (!formState) {
      return false;
    }

    const requiredFields = Object.keys(formState).filter(
      (key) => formState?.[key]?.required,
    );

    const requiredFieldsFilledArray: [string, boolean][] = requiredFields.map(
      (key) => [key, formState?.[key]?.value !== ""],
    );

    set(() => ({
      requiredFieldsFilledMap: new Map(requiredFieldsFilledArray),
    }));

    const hasOneEmptyRequiredField = requiredFieldsFilledArray.some(
      (field) => field[1] === false,
    );

    return !hasOneEmptyRequiredField;
  },
  setFormStateFromEvaluation: (evaluation: EvaluationType) => {
    set(() => ({
      formState: initializeFormState(evaluation),
      requiredFieldsFilledMap: undefined,
    }));
  },
}));

export default useReportPageStore;
