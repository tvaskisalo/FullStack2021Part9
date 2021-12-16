export type Diagnose  = {
    code: string,
    name: string,
    latin?: string
};

export type NonSensitivePatient = Omit<Patient, 'ssn'>; 

export type NewPatient = Omit<Patient, 'id'>;

export type Patient = {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string
};