import { NewPatient, Gender, HealthCheckRating, NewHospitalEntry, NewOccupationalHealthcareEntry, NewHealthCheckEntry } from './types';
/* eslint-disable @typescript-eslint/no-explicit-any */

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const isHealthCheck = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const isArray = (param: any): param is Array<any> => {
    return param instanceof Array; 
};

const isArrayOfStrings = (array: Array<any>): array is Array<string> => {
    return array.every(s => isString(s));
};


const parseText = (text: any, message: string): string => {
    if (!text || !isString(text)) {
        throw new Error(`Incorrect or missing ${message}`);
    }
    return text;
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }

    return date;
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};

const parseDischarge = (object: {date: string, criteria: string}): { date: string, criteria: string }  => {
    if (!object|| !isDate(object.date) || !isString(object.criteria)) {
        throw new Error('Incorrect or missing discharge');
    }
    return object;
};

const parseSickLeave = (object: {startDate: string, endDate: string}): { startDate: string, endDate: string }  => {
    if (!object|| !isDate(object.startDate) || !isString(object.endDate)) {
        throw new Error('Incorrect sick leave');
    }
    return object;
};

const parseHealthCheck = (value: any): HealthCheckRating => {
    if (!value|| !isHealthCheck(value)) {
        throw new Error('Incorrect or missing health check rating');
    }
    return value;
};

const parseDiagnosisCodes = (array: any): Array<string> => {
    if (!array || !isArray(array) || !isArrayOfStrings(array)) {
        throw new Error('Incorrect diagnosiscodes');
    }
    return array;
};

export const toNewPatient = (object: NewPatient): NewPatient => {
    const newPatient: NewPatient = {
        name: parseText(object.name, 'name'),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseText(object.ssn, 'ssn'),
        gender: parseGender(object.gender),
        occupation: parseText(object.occupation, 'occupation'),
        entries: object.entries
    };
    return newPatient;
};


export const toNewHospitalEntry = (object: NewHospitalEntry): NewHospitalEntry => {
    return {
        specialist: parseText(object.specialist, 'specialist'),
        type: 'Hospital',
        date: parseDate(object.date),
        description: parseText(object.description, 'description'),
        discharge: parseDischarge(object.discharge),
        diagnosisCodes: object.diagnosisCodes ? parseDiagnosisCodes(object.diagnosisCodes) : undefined
    };
};


export const toNewOccupationalHealthcareEntry = (object: NewOccupationalHealthcareEntry): NewOccupationalHealthcareEntry => {
    return {
        specialist: parseText(object.specialist, 'specialist'),
        type: 'OccupationalHealthcare',
        date: parseDate(object.date),
        description: parseText(object.description, 'description'),
        employerName: parseText(object.employerName, 'employer name'),
        sickLeave: object.sickLeave ? parseSickLeave(object.sickLeave) : undefined,
        diagnosisCodes: object.diagnosisCodes ? parseDiagnosisCodes(object.diagnosisCodes) : undefined
    };
};


export const toNewHealthCheckEntry = (object: NewHealthCheckEntry): NewHealthCheckEntry => {
    return {
        specialist: parseText(object.specialist, 'specialist'),
        type: 'HealthCheck',
        date: parseDate(object.date),
        description: parseText(object.description, 'description'),
        healthCheckRating: parseHealthCheck(object.healthCheckRating),
        diagnosisCodes: object.diagnosisCodes ? parseDiagnosisCodes(object.diagnosisCodes) : undefined
    };
};