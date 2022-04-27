import { Entry, HealthCheckRating, NewPatient } from "./types";
import * as uuid from 'uuid';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

export const parseEntry = (entry: any): Entry | undefined => {
    if (!entry || !entry.type || !entry.date || !entry.specialist || !entry.description) {
        return undefined;
    }

    switch (entry.type) {
        case 'OccupationalHealthcare':
            return parseOccupationalHealthCareEntry(entry);
        case 'Hospital':
            return parseHospitalEntry(entry);
        case 'HealthCheck':
            return parseHealthCheckEntry(entry);
        default:
            return undefined;
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseOccupationalHealthCareEntry = (entry: any): Entry | undefined => {
    if (!entry.employerName) {
        return undefined;
    }
    const parsedEntry: Entry = {
        type: 'OccupationalHealthcare',
        id: uuid.v1(),
        date: String(entry.date),
        specialist: String(entry.specialist),
        description: String(entry.description),
        employerName: String(entry.employerName)
    };
    if (entry.diagnosisCodes) {
        parsedEntry.diagnosisCodes = entry.diagnosisCodes as string[];
    }
    if (entry.sickLeave & entry.sickLeave.startDate & entry.sickLeave.endDate) {
        parsedEntry.sickLeave = {
            startDate: String(entry.sickLeave.startDate),
            endDate: String(entry.sickLeave.endDate)
        };
    }
    return parsedEntry;
};

const parseHospitalEntry = (entry: any): Entry | undefined => {
    console.log(entry.date);
    const parsedEntry: Entry = {
        type: 'Hospital',
        id: uuid.v1(),
        date: entry.date as string,
        specialist: entry.specialist as string,
        description: entry.description as string,
        
    };
    if (entry.diagnosisCodes) {
        parsedEntry.diagnosisCodes = entry.diagnosisCodes as string[];
    }
    if (entry.discharge) {
        if (!entry.discharge.date || !entry.discharge.criteria) {
            return undefined;
        }
        parsedEntry.discharge = {
            date: entry.discharge.date as string,
            criteria: entry.discharge.criteria as string
        };
    }
    console.log(parsedEntry);
    
    return parsedEntry;
};

const parseHealthCheckEntry = (entry: any): Entry | undefined => {
    if (isNaN(Number(entry.healthCheckRating))) {
        return undefined;
    }
    const parsedEntry: Entry = {
        type: 'HealthCheck',
        id: uuid.v1(),
        date: String(entry.date),
        specialist: String(entry.specialist),
        description: String(entry.description),
        healthCheckRating: entry.healthCheckRating as HealthCheckRating
    };
    if (entry.diagnosisCodes) {
        parsedEntry.diagnosisCodes = entry.diagnosisCodes as string[];
    }
    return parsedEntry;
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