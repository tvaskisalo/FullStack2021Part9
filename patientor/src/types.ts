export type Diagnosis  = {
  code: string,
  name: string,
  latin?: string
};

export enum Gender {Male= 'male', Female = 'female', Other = 'other'}

export type NewPatient = Omit<Patient, 'id'>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BaseEntry {
  type: string,
  id: string,
  date: string,
  specialist: string,
  diagnosisCodes?: string[],
  description: string,
}

interface OccupationalHealthCareEntry extends BaseEntry {
  type: 'OccupationalHealthcare',
  employerName: string,
  sickLeave? : {
      startDate: string,
      endDate: string
  },
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
type: "HealthCheck";
healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital',
  discharge?: {
      date: string,
      criteria: string
  }
}

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[]
};

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries' >;

export type Entry = 
  | OccupationalHealthCareEntry
  | HospitalEntry
  | HealthCheckEntry;