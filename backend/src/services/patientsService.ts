import patientsData from '../../data/patients';
import { Patient, PublicPatient, NewPatient, NewEntry } from '../types';

const getPatients = (): PublicPatient[] => {
    return patientsData.map(({ 
        id, 
        name, 
        dateOfBirth,
        gender,
        occupation,
        entries
    }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const addPatient = ( patient: NewPatient ): Patient => {
    const newPatient = {
        id: `d2773${Math.random() * 1000}-f723-11e9-8f0b-362b9e155667`,
        ...patient
    };
    patientsData.push(newPatient);
    return newPatient;
};

const addEntry = ( entry: NewEntry, patientId: string ): Patient => {
    const newEntry = {
        id: `dsfd23${Math.random() * 1000}-ksk2-11e9-94Ksb-32349e11252117`,
        ...entry
    };
    const patientToUpdate = patientsData.find(patient => patient.id === patientId);
    if (!patientToUpdate) {
        throw new Error('Incorrect or missing patient id');
    }
    const updatedPatient = {
        ...patientToUpdate,
        entries: patientToUpdate?.entries.concat(newEntry)
    };
    const index = patientsData.indexOf(patientToUpdate);
    patientsData[index] = updatedPatient;
    return updatedPatient;
};


const findById = (id: string): Patient | undefined => {
    const patient = patientsData.find(p => p.id === id);
    return patient;
};

export default {
    getPatients,
    addPatient,
    addEntry,
    findById
};

