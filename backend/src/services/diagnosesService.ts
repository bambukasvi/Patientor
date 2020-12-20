import diagnosesData from '../../data/diagnoses';
import { Diagnose } from '../types';

const getDiagnoses = (): Array<Diagnose> => {
    return diagnosesData.map(({
        code,
        name,
        latin
    }) => ({
        code,
        name,
        latin
    }));
};

export default {
    getDiagnoses
};