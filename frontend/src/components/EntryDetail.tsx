import React from 'react';
import { Entry, HealthCheckRating } from '../types';
import { Icon } from 'semantic-ui-react';

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const HospitalEntry: React.FC<{ 
    date: string; 
    description: string; 
    discharge: {
        date: string;
        criteria: string;
    };
}> = ({ 
    date,
    description,
    discharge
 }) => (
    <div>
        <h3>{date} <Icon name="hospital"/></h3>
        { description }
        <p>discharge date: { discharge.date }</p>
        <p>discharge criteria: { discharge.criteria } </p>
    </div>
);

const OccupationalEntry: React.FC<{ 
    date: string; 
    description: string; 
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
}> = ({ 
    date,
    description,
    employerName,
    sickLeave
 }) => (
    <div>
        <h3>{date} <Icon name="medkit"/></h3>
        { description }
        <p>Employer name: { employerName }</p>
        <p>Sick leave: {sickLeave?.startDate} - {sickLeave?.endDate}</p>
    </div>
);

const HealthCheckEntry: React.FC<{ 
    date: string; 
    description: string; 
    healthCheckRating: HealthCheckRating;
}> = ({ 
    date,
    description,
    healthCheckRating
 }) => {
    const healthIcon = () => {
        if (healthCheckRating === "Healthy") {
            return <Icon name="heart" color="green" />;
        }
        if (healthCheckRating === "LowRisk") {
            return <Icon name="heart" color="yellow" />;
        }
        if (healthCheckRating === "HighRisk") {
            return <Icon name="heart" color="orange" />;
        }
        if (healthCheckRating === "CriticalRisk") {
            return <Icon name="heart" color="red" />;
        }
    };

    return (
        <div>
            <h3>{date} <Icon name="user md"/></h3>
            { description }
            { healthIcon() }
        </div>
    );
 };

const EntryDetail: React.FC<{ entry: Entry }> = ({ entry }) => {

    switch (entry.type) {
        case "Hospital":
            return <HospitalEntry 
                date={entry.date}
                description={entry.description}
                discharge={entry.discharge}
            />;
        case "OccupationalHealthcare":
            return <OccupationalEntry 
                date={entry.date}
                description={entry.description}
                employerName={entry.employerName}
                sickLeave={entry.sickLeave}
            />;
        case "HealthCheck":
            return <HealthCheckEntry 
                date={entry.date}
                description={entry.description}
                healthCheckRating={entry.healthCheckRating}
            />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetail;