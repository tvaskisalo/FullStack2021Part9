export type Diagnose  = {
    code: string,
    name: string,
    latin?: string
};

export type NewPatient = Omit<Patient, 'id'>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
    type: string,
    id: string,
    date: string,
    specialist: string,
    diagnosisCodes?: string[],
    description: string,
}

export interface OccupationalHealthCareEntry extends Entry {
    type: 'OccupationalHeathcare',
    employerName: string,
    sickLeave? : {
        startDate: string,
        endDate: string
    },
}

export interface HospitalEntry extends Entry {
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
    gender: string;
    occupation: string;
    entries: Entry[]
};

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries' >;