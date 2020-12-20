import React from 'react';
import { Field, Formik, Form } from "formik";
import { Grid, Button } from "semantic-ui-react";

import { useStateValue } from '../state';
import { TextField, HealthSelectField, DiagnosisSelection, HealthOption} from "../AddPatientModal/FormField";

import { NewHospitalEntry, NewOccupationalHealthcareEntry, NewHealthCheckEntry, HealthCheckRating } from '../types';


interface HospitalProps {
    onSubmit: (values: NewHospitalEntry) => void;
}

interface HealthCheckProps {
    onSubmit: (values: NewHealthCheckEntry) => void;
}

interface OccupationalProps {
    onSubmit: (values: NewOccupationalHealthcareEntry) => void;
}

export const AddHospitalEntryForm: React.FC<HospitalProps> = ({ onSubmit }) => {
    const [{ diagnosisList }] = useStateValue();
  
    return (
      <Formik
        initialValues={{
            description: "",
            date: "",
            specialist: "",
            discharge: {
                date: "",
                criteria: ""
            },
            type: "Hospital"
        }}
        onSubmit={onSubmit}
        validate={values => {
            const requiredError = "Field is required";
            const errors: { [field: string]: string } = {};
            if (!values.description) {
                errors.description = requiredError;
            }
            if (!values.date) {
                errors.date = requiredError;
            }
            if (!values.specialist) {
                errors.specialist = requiredError;
            }
            if (!values.discharge) {
                errors.discharge = requiredError;
            }
            return errors;
          }}
        >
        {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
    
            return (
            <Form className="form ui">
                <Field
                    label="Description"
                    placeholder="Description"
                    name="description"
                    component={TextField}
                />
                <Field
                    label="Date"
                    placeholder="YYYY-MM-DD"
                    name="date"
                    component={TextField}
                />
                <Field
                    label="Specialist"
                    placeholder="Specialist"
                    name="specialist"
                    component={TextField}
                />
                <Field
                    label="Discharge date"
                    name="discharge.date"
                    placeholder="YYYY-MM-DD"
                    component={TextField}
                />
                <Field
                    label="Discharge criteria"
                    name="discharge.criteria"
                    placeholder="Criteria"
                    component={TextField}
                />
                <DiagnosisSelection
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    diagnoses={Object.values(diagnosisList)}
                />
                <Grid>
                    <Grid.Column floated="right" width={5}>
                        <Button
                            type="submit"
                            floated="right"
                            color="green"
                            disabled={!dirty || !isValid}
                        >
                            Add
                        </Button>
                    </Grid.Column>
                </Grid>
            </Form>
            );
        }}
    </Formik>
    );
  };


    
    export const AddOccupationalEntryForm: React.FC<OccupationalProps> = ({ onSubmit }) => {
        const [{ diagnosisList }] = useStateValue();
    
        return (
            <Formik
                initialValues={{
                    description: "",
                    date: "",
                    specialist: "",
                    employerName: "",
                    sickLeave: {
                        startDate: "",
                        endDate: "",
                    },
                    type: "OccupationalHealthcare"
                }}
                onSubmit={onSubmit}
                validate={values => {
                    const requiredError = "Field is required";
                    const errors: { [field: string]: string } = {};
                    if (!values.description) {
                        errors.description = requiredError;
                    }
                    if (!values.date) {
                        errors.date = requiredError;
                    }
                    if (!values.specialist) {
                        errors.specialist = requiredError;
                    }
                    if (!values.employerName) {
                        errors.employerName = requiredError;
                    }
                    return errors;
                }}
                >
                {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
            
                    return (
                    <Form className="form ui">
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <Field 
                            label="Employer name"
                            name="employerName"
                            placeholder="employer name"
                            component={TextField}
                        />
                        <Field
                            label="Sick leave start date"
                            name="sickLeave.startDate"
                            placeholder="YYYY-MM-DD"
                            component={TextField}
                        />
                        <Field
                            label="Sick leave end date"
                            name="sickLeave.endDate"
                            placeholder="YYYY-MM-DD"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnosisList)}
                        />
                        <Grid>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                    );
                }}
            </Formik>
        );
    };


    const healthCheckOptions: HealthOption[] = [
        { value: HealthCheckRating.Healthy, label: "Healthy" },
        { value: HealthCheckRating.LowRisk, label: "Low risk" },
        { value: HealthCheckRating.HighRisk, label: "High Risk" },
        { value: HealthCheckRating.CriticalRisk, label: "Critical risk" },
      ];
    
    export const AddHealthCheckEntryForm: React.FC<HealthCheckProps> = ({ onSubmit }) => {
        const [{ diagnosisList }] = useStateValue();
    
        return (
            <Formik
                initialValues={{
                    description: "",
                    date: "",
                    specialist: "",
                    healthCheckRating: HealthCheckRating.Healthy,
                    type: "HealthCheck"
                }}
                onSubmit={onSubmit}
                validate={values => {
                    const requiredError = "Field is required";
                    const errors: { [field: string]: string } = {};
                    if (!values.description) {
                        errors.description = requiredError;
                    }
                    if (!values.date) {
                        errors.date = requiredError;
                    }
                    if (!values.specialist) {
                        errors.specialist = requiredError;
                    }
                    return errors;
                }}
                >
                {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
            
                    return (
                    <Form className="form ui">
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <HealthSelectField
                            label="Health rating"
                            name="healthCheckRating"
                            options={healthCheckOptions}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnosisList)}
                        />
                        <Grid>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                    );
                }}
            </Formik>
        );
    };