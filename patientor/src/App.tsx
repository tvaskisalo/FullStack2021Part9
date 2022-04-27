import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";
import { setPatientList, useStateValue, setDiagnosisList } from "./state";
import { Diagnosis, Patient } from "./types";

import PatientInfo from "./components/patientInfo";

import PatientListPage from "./PatientListPage";

const App = () => {
  const [, dispatch] = useStateValue();

  React.useEffect(() => {
    void axios.get<void>(`/api/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `/api/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    const fetchDiagnoses = async () => {
      try {
        const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(
          `/api/diagnosis`
        );
        dispatch(setDiagnosisList(diagnosesFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
    void fetchDiagnoses();
    
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/:id">
              <PatientInfo/>
            </Route>
            <Route path="/">
              <PatientListPage />
            </Route> 
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
