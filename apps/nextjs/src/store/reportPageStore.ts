// store/store.js
import { CriteriaValuePair, StudentEvaluation } from "@acme/db";
import { create } from "zustand";

export type Tabs = "evaluation" | "report";

export type EvaluationType = StudentEvaluation & {
  criteriaValues: CriteriaValuePair[];
};

type FormStateType = {
  [id: string]: {
    type: string;
    value: string;
    required: boolean;
  };
};

const initializeFormState = (evaluation: EvaluationType) => {
  const formState: FormStateType = {
    name: {
      type: "text",
      value: evaluation.studentName,
      required: true,
    },
    pronouns: {
      type: "text",
      value: evaluation.studentPronouns,
      required: true,
    },
  };

  evaluation.criteriaValues.forEach((criteria) => {
    formState[criteria.id] = {
      type: criteria.criteriaType,
      value: criteria.criteriaValue,
      required: criteria.required,
    };
  });

  return formState;
};

interface ReportPageStore {
  tab: Tabs;
  changeTab: (newColor: Tabs) => void;
  formState: FormStateType | undefined;
  updateFormState: (key: string, value: string) => void;
  setFormStateFromEvaluation: (evaluation: EvaluationType) => void;
  getValueForKey: (key: string) => string | undefined;
  getRequiredForKey: (key: string) => boolean | undefined;
}
// create store
const useReportPageStore = create<ReportPageStore>((set, get) => ({
  tab: "evaluation",
  changeTab: (newTab: Tabs) => {
    set(() => ({ tab: newTab }));
  },
  formState: undefined,
  getValueForKey: (key: string) => {
    return get().formState?.[key]?.value;
  },
  getRequiredForKey: (key: string) => {
    return get().formState?.[key]?.required;
  },
  updateFormState: (key: string, value: string) => {
    set((state) => ({
      formState: {
        ...state.formState,
        [key]: {
          type: state.formState?.[key]?.type ?? "",
          value,
          required: state.formState?.[key]?.required ?? false,
        },
      },
    }));
  },
  setFormStateFromEvaluation: (evaluation: EvaluationType) => {
    set(() => ({
      formState: initializeFormState(evaluation),
    }));
  },
}));

export default useReportPageStore;