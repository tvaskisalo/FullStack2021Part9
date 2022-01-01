import { Entry, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (string: unknown): string => {
    if (!string || !isString(string)) {
      throw new Error('Incorrect or missing string');
    }
  
    return string;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const isEntries = (param: any): param is Array<Entry> => {
    let success = true;
    if (!(param instanceof Array)) {
       success = false;
    }
    if (param.length !== 0) {
       // eslint-disable-next-line @typescript-eslint/no-unsafe-call
       param.forEach((e: { type: Entry; }) => {
           if (!e.type || typeof e.type !== 'string') {
               success =false;
           }
           if (['Hospital','HealthCheck','OccupationalHealthcare'].includes(String(e.type))) {
               success = false;
           }
       });
    }

    return success;
};
  
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseEntries = (entries: unknown): Array<Entry> => {
    if (!entries || !isEntries(entries)) {
        throw new Error('Incorrect or missing entries: ' + entries);
    }
    return entries;
};

type Fields = {name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown};
const toNewPatientEntry = ({name, dateOfBirth, ssn, gender, occupation,entries} : Fields): NewPatient => {
    const newEntry: NewPatient = {
        name: parseString(name),
        dateOfBirth: parseString(dateOfBirth),
        ssn: parseString(ssn),
        gender: parseGender(gender),
        occupation: parseString(occupation),
        entries: parseEntries(entries)
    };

    return newEntry;
};

export default toNewPatientEntry;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}