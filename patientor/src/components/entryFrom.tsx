import React from "react";
import { Field, Formik, Form } from "formik";
import { Button, Grid, Form as SForm } from "semantic-ui-react";
import { HospitalEntry } from "../types";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";

type SelectEntryFieldProps = {
    name: string;
    label: string;
    options: TypeOption[];
};

type TypeOption = {
  value: string;
  label: string;
};


  
export const SelectEntryField = ({
    name,
    label,
    options
  }: SelectEntryFieldProps) => (
    <SForm.Field>
      <label>{label}</label>
      <Field as="select" name={name} className="ui dropdown">
        {options.map(option => (
          <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
        ))}
      </Field>
    </SForm.Field>
  );

  export type EntryFormValues = Omit<HospitalEntry, "id">;

  interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
  }

  const typeOptions: TypeOption[] = [
    {
      value: 'Hospital',
      label: 'Hospital'
    },{
      value: 'OccupationalHealthCare',
      label: 'OccupationalHealthCare'
    }, {
      value: 'HealthCheck',
      label: 'HealthCheck'
    }
  ];
  


  const HospitalEntryForm = ({onSubmit, onCancel}: Props) => {
    const [{diagnoses}] = useStateValue();
    return (
      <Formik
        initialValues={{
          type: "Hospital",
          date: "",
          specialist: "",
          description: "",
          diagnosisCodes: [],
          discharge: {
            date: "",
            criteria: ""
          }
        }}
        onSubmit={onSubmit}
        validate={values => {
          const requiredError = "Field is required";
          const errors: { [field: string]: string } = {};
          
          if (!values.type) {
            errors.type = requiredError;
          }
          if (!values.date) {
            errors.date = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (!values.description) {
            errors.description = requiredError;
          }
          return errors;
        }}
      >
        {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
          return (
            <Form className="form ui">
              <Field
                label="Date"
                placeholder="DATE"
                name="date"
                component={TextField}
              />
              <Field
                label="Specialist"
                placeholder="SPECIALIST"
                name="specialist"
                component={TextField}
              />
              <Field
                label="Description"
                placeholder="DESCRIPTION"
                name="description"
                component={TextField}
              />
              <Field
                label="Discharge date"
                placeholder="DISCHARGE DATE"
                name="discharge.date"
                component={TextField}
              />
              <Field
                label="Discharge criteria"
                placeholder="DISCHARGE CRITERIA"
                name="discharge.criteria"
                component={TextField}
              />
              <SelectEntryField
                label="Type"
                name="type"
                options={typeOptions}
              />
              <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
              />  
              <Grid>
                <Grid.Column floated="left" width={5}>
                  <Button type="button" onClick={onCancel} color="red">
                    Cancel
                  </Button>
                </Grid.Column>
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

export default HospitalEntryForm;