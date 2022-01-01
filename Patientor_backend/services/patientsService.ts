import patients from '../data/patients';
import { Patient, NonSensitivePatient, NewPatient, Entry } from '../types';

import * as uuid from 'uuid';


const getPatients = (): Array<NonSensitivePatient> => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatient = (id: string): NonSensitivePatient | undefined => {
  return patients.find(e => e.id===id);
};

const addPatient = (entry: NewPatient): NonSensitivePatient => {
  const id:string = uuid.v1();
  const e: Array<Entry> = [];
  const patient: Patient = {...entry, id, entries: e};
  patients.push(patient);
  return patient;
};

export default {
    getPatients,
    addPatient,
    getPatient
};