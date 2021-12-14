interface TrainingResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface Input {
    hours: Array<number>,
    target: number
}

export const exerciseCalculator = (hours: Array<number>, target: number): TrainingResult => {
    const returnValue = {
        periodLength: hours.length,
        trainingDays: 0,
        success: false,
        rating: 1,
        ratingDescription: "",
        target: target,
        average: 0
    };
    let sum = 0;
    hours.forEach(h => {
        if (h !== 0) {
            returnValue.trainingDays = returnValue.trainingDays+1;
        }
        sum = h+sum;
    });
    const avg = sum/returnValue.periodLength;
    returnValue.average= avg;
    if (avg < target) {
        returnValue.ratingDescription = "not bad but could be better";
    } else if(avg === target) {
        returnValue.ratingDescription = "Good";
        returnValue.rating=2;
        returnValue.success=true;
    } else {
        returnValue.ratingDescription = "Great!";
        returnValue.rating=3;
        returnValue.success = true;
    }
    return(returnValue);
};

const parse = (args: Array<string>): Input => {
    const len = args.length;
    if (len < 4) {
    throw new Error('Not enough arguments');
    } 
    let hours: Array<number> = [];
    for (let i = 2; i<len-1; i++) {
        const h = Number(args[i]);
    if (isNaN(h)) {
        throw new Error("Incorrect values");
    }
    hours = hours.concat(h);
    }
    const target = Number(args[len-1]);

    if (isNaN(target)) {
        throw new Error("Incorrect values");
    }
    return {hours, target};
};

try {
    const {hours,target} = parse(process.argv);
    console.log(exerciseCalculator(hours,target));
}   catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}


