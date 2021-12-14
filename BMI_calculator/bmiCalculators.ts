export const calculateBmi = (height: number, weight: number): string => {
    const hInm = height/100;
    const bmi = weight/(hInm*hInm);
    if (bmi< 18.5) {
        return "Underweight (potentially dangerous)";
    } else if (bmi < 23) {
        return "Normal (healthy weight)";
    } else if (bmi < 27.4) {
        return "Mildly overweight (moderate risk)";
    } else {
        return "Obese (high risk)";
    }
};

const parseWH = (args:Array<string>): Array<number> => {
    if (args.length < 4) {
        throw new Error('Not enough arguments');
    } 
    const height = Number(args[2]);
    const weight = Number(args[3]);
    if (isNaN(weight) || isNaN(height)) {
        throw new Error("Incorrect values");
    }
    return [height, weight];
};

try {
    const wh = parseWH(process.argv);
    console.log(calculateBmi(wh[0],wh[1]));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}


