import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AddHospitalEntryForm, AddHealthCheckEntryForm, AddOccupationalEntryForm } from './AddEntryForm';
import { Patient, Diagnosis, NewEntry } from '../types';
import { useParams } from 'react-router-dom';
import { useStateValue, updatePatient, setDiagnosisList } from '../state';
import { apiBaseUrl} from '../constants';
import { Header, Icon, List, Segment } from "semantic-ui-react";
import EntryDetail from './EntryDetail';


const PatientInfo: React.FC<{}>= () => {
    const [ { patients, diagnosisList }, dispatch ] = useStateValue();
    const [ selectedPatient, setSelectedPatient ] = useState<Patient | undefined>();
    const [ entryType, setEntryType ] = useState<string>('Hospital');
    const [ error, setError ] = useState<string>('');
    const { id } = useParams<{ id: string }>();


    useEffect(() => {
        const fetchPatientInfo = async () => {
            try {
                if (patients[id] && patients[id].ssn) {
                    setSelectedPatient(patients[id]);
                    return;
                }
                const { data: patient } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                dispatch(updatePatient(patient));
                setSelectedPatient(patient);
            } catch (e) {
                console.error(e);
            }
        };
        const fetchDiagnosisList = async () => {
            try {
                const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
                    `${apiBaseUrl}/diagnosis`
                );
                dispatch(setDiagnosisList(diagnosisListFromApi));
            } catch (e) {
                console.log(e);
            }
        }; 

        if (!diagnosisList) {
            fetchDiagnosisList();
        }
        fetchPatientInfo();
    }, [dispatch, diagnosisList, id, patients]); 

    if (!selectedPatient) return null;

    const handleEntrySubmit = async (values: NewEntry) => {
        try {
            if (values.type === "HealthCheck") console.log(values.healthCheckRating);
            const { data: updatedPatient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${selectedPatient.id}/entries`,
                values
            );
            dispatch(updatePatient(updatedPatient));
        } catch (e) {
            setError(e.response.data.error);
        }
    };

    const EntryForm = (type: string) => {
        if (type === 'Hospital') {
            return <AddHospitalEntryForm onSubmit={handleEntrySubmit}/>;
        }
        if (type === 'OccupationalHealthcare') {
            return <AddOccupationalEntryForm onSubmit={handleEntrySubmit}/>;
        }
        if (type === 'HealthCheck') {
            return <AddHealthCheckEntryForm onSubmit={handleEntrySubmit}/>;
        }
    };

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setEntryType(event.target.value);
    };

    return (
        <div>
            {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
            <Header as="h2">
                {selectedPatient.name}
                <Icon 
                    name={selectedPatient.gender ? "mars" : "venus"}
                    size="large"
                />
            </Header>
            <p>ssn: {selectedPatient.ssn}</p>
            <p>occupation: {selectedPatient.occupation}</p>
            <h3>Add entry</h3>
            <label>Entry type </label>
            <select onChange={handleTypeChange} value={entryType}>
                <option value="Hospital">Hospital</option>
                <option value="OccupationalHealthcare">Occupational</option>
                <option value="HealthCheck">Health check</option>
            </select>
            {EntryForm(entryType)}
            <h3>entries</h3>
            <List divided relaxed>
                {selectedPatient.entries.map(entry =>
                    <List.Item key={entry.id}>
                        <EntryDetail entry={entry} />
                        <List>
                        { entry.diagnosisCodes 
                            ? entry.diagnosisCodes.map(code =>
                                <List.Item key={code}>{code} {diagnosisList[code] ? diagnosisList[code].name : null}</List.Item>) 
                            : null}
                        </List>
                    </List.Item>
                )}
            </List>
        </div>
    );
};

export default PatientInfo;