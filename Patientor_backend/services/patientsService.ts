import patientData from '.././data/patients.json';
import { Patient, NonSensitivePatient, NewPatient } from '../types';

import * as uuid from 'uuid';

const patients: Array<Patient> = patientData;

const getPatients = (): Array<NonSensitivePatient> => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatient): NonSensitivePatient => {
  const id:string = uuid.v1();
  const patient: Patient = {...entry, id};
  patients.push(patient);
  return patient;
};

export default {
    getPatients,
    addPatient
};