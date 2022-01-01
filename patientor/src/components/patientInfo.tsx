import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Icon, Item } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { addPrivatePatient, useStateValue } from "../state";
import { Patient, Entry, Diagnosis} from "../types";



const PatientInfo = () => {
    const [{ privatePatients, diagnoses }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const pPatients = Object.values(privatePatients);
    const allDiagnoses = Object.values(diagnoses);
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

    const parseDiagnoses = (diagnosisCodes?: string[]) => {
      if ( !diagnosisCodes || diagnosisCodes.length === 0) {
        return <div></div>;
      }
      return <ul>
        {diagnosisCodes.map(dc => {
          const diagnosis: Diagnosis | undefined = allDiagnoses.find(d => d.code === dc);
          return (<li key={dc}>{dc}: {diagnosis?.name}</li>);
        }
        )}
      </ul>;
    };

    const parseHealthCheck = (entry: Entry) => {
      return <div>
        <h3><Icon name='user md' size='big'/>{entry.date}</h3>
        {entry.description} {parseDiagnoses(entry.diagnosisCodes)}
      </div>;
    };

    const parseHospital = (entry: Entry) => {
      return <div>
        <h3><Icon name='hospital' size='big' />{entry.date}</h3>
        {entry.description} {parseDiagnoses(entry.diagnosisCodes)}
      </div>;
    };

    const parseOccupationalHealthCare = (entry: Entry) => {
      return <div>
        <h3> <Icon name='stethoscope' size='large'/>{entry.date}</h3>
        {entry.description} {parseDiagnoses(entry.diagnosisCodes)}
      </div>;
    };
    const parseEntires = (entries: Entry[]) => {
      return <Item.Group divided>{entries.map(e => {
        switch (e.type) {
          case 'HealthCheck':
            //<div key={e.id}>{e.date} {e.description} {parseDiagnoses(e.diagnosisCodes)}</div>;
            return <Item key={e.id}>{parseHealthCheck(e)}</Item>;
          case 'Hospital':
            return <Item key={e.id}>{parseHospital(e)}</Item>;
          case 'OccupationalHealthcare':
            return <Item key={e.id}> {parseOccupationalHealthCare(e)}</Item>;
          default: 
            return <div></div>;
        }
        })}</Item.Group>;
    };

    const parseGender = (patient: Patient) => {
      switch (patient.gender) {
        case 'male':
            return <h1>{patient.name}  <Icon name='mars'/></h1>;
        case 'female':
            return <h1>{patient.name}  <Icon name='venus'/></h1>;
        case 'other':
            return <h1>{patient.name}  <Icon name='genderless'/></h1>;
        default:
            return <div></div>;
      }
    };
    
    return <div>
    {parseGender(patient)}
    <p>ssn: {patient.ssn}</p>
    <p>occupation: {patient.occupation}</p>
    <h2>Entries</h2>
    {parseEntires(patient.entries)}
    </div>;
};
export default PatientInfo;