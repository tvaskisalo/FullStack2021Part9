import { NewPatient } from "./types";

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
  
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

type Fields = {name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown};
const toNewPatientEntry = ({name, dateOfBirth, ssn, gender, occupation} : Fields): NewPatient => {
    const newEntry: NewPatient = {
        name: parseString(name),
        dateOfBirth: parseString(dateOfBirth),
        ssn: parseString(ssn),
        gender: parseGender(gender),
        occupation: parseString(occupation)
    };

    return newEntry;
};

export default toNewPatientEntry;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}