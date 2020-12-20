import express from 'express';
import patientService from '../services/patientsService';
import { toNewPatient, toNewHospitalEntry, toNewOccupationalHealthcareEntry, toNewHealthCheckEntry } from '../utils';
import { NewPatient, Entry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
    const id: string = req.params.id;
    const patient = patientService.findById(id);
    res.send(patient);
});

router.post('/', (req, res) => {
    const body = req.body as NewPatient;
    try {
        const newPatient = toNewPatient(body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (e) {
        if (e instanceof Error) {
            res.status(401).json({ error: e.message });
        } else {
            throw e;
        }
    }
});

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

router.post('/:id/entries', (req, res) => {
    const body = req.body as Entry;
    const patientId: string = req.params.id;
    if (!body.type) {
        res.status(401).json({ error: "Missing type"});
    }
    try {
        switch (body.type) {
            case "Hospital": {
                const entryToAdd = toNewHospitalEntry(body);
                const updatedPatient = patientService.addEntry(entryToAdd, patientId);
                res.json(updatedPatient);
                break;
            }
            case "OccupationalHealthcare": {
                const entryToAdd = toNewOccupationalHealthcareEntry(body);
                const updatedPatient = patientService.addEntry(entryToAdd, patientId);
                res.json(updatedPatient);
                break;
            }
            case "HealthCheck": {
                const entryToAdd = toNewHealthCheckEntry(body);
                const updatedPatient = patientService.addEntry(entryToAdd, patientId);
                res.json(updatedPatient);
                break;
            }
            default:
                assertNever(body);
            }
    } catch (e) {
        if (e instanceof Error) {
            res.status(401).json({ error: e.message});
        } else {
            throw e;
        }
    }
});

export default router;

