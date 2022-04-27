import patients from '../data/patients';
import { Patient, NonSensitivePatient, NewPatient, Entry } from '../types';

import * as uuid from 'uuid';
import { parseEntry } from '../utils';


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

// eslint-disable-next-line @typescript-eslint/no-explicit-any 
const addEntryToPatient = (id: string, entry: any): Entry | undefined=> {
  const parsedEntry = parseEntry(entry);
  const patient = patients.find(p => p.id===id);
  if (!patient || !parsedEntry) {
    return undefined;
  }
  patient.entries = patient.entries.concat(parsedEntry);
  return parsedEntry;
};

export default {
    getPatients,
    addPatient,
    getPatient,
    addEntryToPatient
};