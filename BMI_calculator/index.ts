import express = require('express');
import { calculateBmi } from './bmiCalculators';
import { exerciseCalculator } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req,res) => {
  const w = Number(req.query.weight);
  const h = Number(req.query. height);
  if (isNaN(w) || isNaN(h)) {
    res.status(400).send({
      error: "malformatted parameters"
    });
  } else {
    const r = calculateBmi(h,w);
    res.json({weight: w, height: h, bmi:r});
  }
});

app.post('/exercises', (req,res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = req.body;
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!body.daily_exercises || !body.target) {
    res.status(400).send({
      error: "parameters missing"
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const exercises = body.daily_exercises; 
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const target = Number(body.target);
  if (isNaN(target)) {
    res.status(400).send({
      error: "malformatted parameters"
    });
  }
  let hours: Array<number> = [];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  exercises.forEach((e: any) => {
    const h = Number(e);
    if (isNaN(h)) {
      res.status(400).send({
        error: "malformatted parameters"
      });
    }
    hours = hours.concat(h);
  });
  
  const r = exerciseCalculator(hours, target);
  res.json(r);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});