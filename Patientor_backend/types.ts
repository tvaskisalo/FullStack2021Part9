export type Diagnose  = {
    code: string,
    name: string,
    latin?: string
};

export type NewPatient = Omit<Patient, 'id'>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
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