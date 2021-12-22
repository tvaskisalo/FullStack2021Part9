import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { addPrivatePatient, useStateValue } from "../state";
import { Patient } from "../types";



const PatientInfo = () => {
    const [{ privatePatients }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const pPatients = Object.values(privatePatients);
    React.useEffect(() => {
        const fetch = async () => {
          try {
            const { data: newPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
            dispatch(addPrivatePatient(newPatient));
          } catch (e)  {
            console.error(e);
          }
        };
        if (!pPatients) {
          void fetch();
        }
    
        if (!pPatients.find(p => p.id===id)) {
          void fetch();
        }
      },[id]);
    const patient: Patient | undefined = pPatients.find(p => p.id === id);
    if (!patient) {
        return <div></div>;
    }

    switch (patient.gender) {
        case 'male':
            return <div>
                <h1>{patient.name}  <Icon name='mars'/></h1>
                <p>ssn: {patient.ssn}</p>
                <p>occupation: {patient.occupation}</p>
            </div>;
        case 'female':
            return <div>
                <h1>{patient.name}  <Icon name='venus'/></h1>
                <p>ssn: {patient.ssn}</p>
                <p>occupation: {patient.occupation}</p>
            </div>;
        case 'other':
            return <div>
                <h1>{patient.name}  <Icon name='genderless'/></h1>
                <p>ssn: {patient.ssn}</p>
                <p>occupation: {patient.occupation}</p>
            </div>;
        default:
            return <div></div>;
    }
    
    
};
export default PatientInfo;