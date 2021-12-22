import React from "react";
import { CoursePart } from "../types";

const Part = ({part}: {part: CoursePart}) => {
    switch (part.type) {
        case "normal":
            return <p> 
                <h2>{part.name} {part.exerciseCount}</h2> 
                <div>{part.description}</div>
            </p>;
        case "groupProject":
            return <p> 
                <h2>{part.name} {part.exerciseCount}</h2> 
                <div>Project exercises {part.groupProjectCount}</div>
            </p>;
        case "special":
            return <p> 
                <h2>{part.name} {part.exerciseCount}</h2> 
                <div>{part.description}</div>
                <div>Required skills: {part.requirements.join(", ")}</div>
            </p>;
        case "submission":
            return <p> 
                <h2>{part.name} {part.exerciseCount}</h2> 
                <div>{part.description}</div>
                <div>Submit to {part.exerciseSubmissionLink} </div>
            </p>;
        default: return assertNever(part);
    }
    return null;
}

/**
 * Helper function for exhaustive type checking
 */
 const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

export default Part