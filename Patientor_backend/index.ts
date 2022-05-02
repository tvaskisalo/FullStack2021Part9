/* eslint-disable   */
const express = require('express');
const cors = require('cors');
import diagnosesRouter from './routers/diagnosesRouter';
import patientsRouter from './routers/patientsRouter';

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('build'));

const PORT = process.env.PORT || 3001;

app.get('/api/ping', (_req: any, res: { send: (arg0: string) => void; }) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnosis',diagnosesRouter);

app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});