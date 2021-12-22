interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

interface CourseNormalPart extends CoursePartBase, CourseDescription {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseDescription {
  description: string;
}

interface CourseSubmissionPart extends CoursePartBase, CourseDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseRequirementsPart extends CoursePartBase, CourseDescription {
  type: "special",
  requirements: string[]
}
  
export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseRequirementsPart;