import { State } from "./state";
import { Patient } from "../types";

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
