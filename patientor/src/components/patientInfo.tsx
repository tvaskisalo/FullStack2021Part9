import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Button, Icon, Item, Modal, Segment } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { addPrivatePatient, useStateValue } from "../state";
import { Patient, Entry, Diagnosis, HospitalEntry} from "../types";
import HospitalEntryForm, { EntryFormValues } from "./entryFrom";


const PatientInfo = () => {
    const [{ privatePatients, diagnoses }, dispatch] = useStateValue();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    
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

  

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      
      const  newPatient = {...patient, entries: patient.entries.concat(newEntry)};
      dispatch(addPrivatePatient(newPatient));
      closeModal();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };


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

    const parseHospital = (entry: HospitalEntry) => {
      if (entry.discharge) {
        return <div>
          <h3><Icon name='hospital' size='big' />{entry.date}</h3>
          {entry.description} {parseDiagnoses(entry.diagnosisCodes)}
          <p>Discharge date: {entry.discharge.date}.</p> 
          <p> Criteria: {entry.discharge.criteria}</p>
        </div>;
      }
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
    
    interface Props {
      modalOpen: boolean;
      onClose: () => void;
      onSubmit: (values: EntryFormValues) => void;
      error?: string;
    }
    const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
      <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
        <Modal.Header>Add a new entry</Modal.Header>
        <Modal.Content>
          {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
          <HospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
        </Modal.Content>
      </Modal>
    );
    return <div>
    <AddEntryModal
      modalOpen={modalOpen}
      onSubmit={submitNewEntry}
      error={error}
      onClose={closeModal}
    />
    <Button onClick={() => openModal()}>Add New Entry</Button>
    {parseGender(patient)}
    <p>ssn: {patient.ssn}</p>
    <p>occupation: {patient.occupation}</p>
    <h2>Entries</h2>
    {parseEntires(patient.entries)}
    </div>;
};
export default PatientInfo;