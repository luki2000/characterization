import AssignmentBuilder from "../builders/assignment.builder";
import ClassRoomBuilder from "../builders/class-room.builder";
import StudentEnrollementBuilder from "../builders/enrolled-student.builder";
import StudentBuilder from "../builders/student.builder";
import StudentAssignmentBuilder from "../builders/studentAssignment.builder";
import SubmissionBuilder from "../builders/studentSubmission.builder";



function aStudent() {
  return new StudentBuilder();
}

function aClassRoom() {
  return new ClassRoomBuilder()
}

function anAssignment() {
  return new AssignmentBuilder();
}

function anEnrolledStudent() {
  return new StudentEnrollementBuilder();
}

function aStudentAssignment() {
  return new StudentAssignmentBuilder();
}

function aSubmittedAssignment() {
  return new SubmissionBuilder()
}


export {
  aStudent,
  aClassRoom,
  anAssignment,
  anEnrolledStudent,
  aStudentAssignment,
  aSubmittedAssignment,
};