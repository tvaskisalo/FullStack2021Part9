import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_PRIVATE_PATIENT";
      payload: Patient;
  }
  | {
    type: "SET_DIAGNOSES_LIST";
    payload: Diagnosis[];
  };

export const setPatientList = (patients: Array<Patient>) => {
  const returnValue: Action = {
    type: "SET_PATIENT_LIST",
    payload: patients
  };
  return returnValue;
};

export const addPatient = (patient: Patient) => {
  const returnValue: Action = {
    type: "ADD_PATIENT",
    payload: patient
  };
  return returnValue;
};

export const setDiagnosisList = (diagnoses: Diagnosis[]) => {
  const returnValue: Action = {
    type: "SET_DIAGNOSES_LIST",
    payload: diagnoses
  };
  return returnValue;
};

export const addPrivatePatient = (patient: Patient) => {
  const returnValue: Action = {
    type: "ADD_PRIVATE_PATIENT",
    payload: patient
  };
  return returnValue;
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_PRIVATE_PATIENT":
      return {
        ...state,
        privatePatients: {
          ...state.privatePatients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};
