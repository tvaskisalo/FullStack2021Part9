import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils';
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const router = express.Router();

router.get('/', (_req,res) => {
  res.send(patientsService.getPatients());
});

router.get('/:id', (req, res) => {
  const id: string = req.params.id;
  res.send(patientsService.getPatient(id));
});

router.post('/:id/entries', (req,res) => {
  const id: string = req.params.id;
  const entry = req.body;
  if (!entry ) {
    res.status(400);
    res.end();
  }
  const returnValue = patientsService.addEntryToPatient(id, entry);
  if (!returnValue) {    
    res.status(400);
    res.end();
  } 
  res.send(returnValue);
});

router.post('/', (req,res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientEntry({...req.body, entries: []});
    const addedEntry = patientsService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;