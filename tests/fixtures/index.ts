import { StudentBuilder } from "../builders/studentBuilder";
import { AssignmentBuilder } from "../builders/assignmentBuilder";
import { ClassroomBuilder } from "../builders/classRoomBuilder";
import { EnrolledStudentBuilder } from "../builders/enrolled-student.builder";


function aStudent() {
  return new StudentBuilder();
}

function aClassRoom () {
  return new ClassroomBuilder()
}

function anAssignment () {
  return new AssignmentBuilder();
}

function anEnrolledStudent () {
  return new EnrolledStudentBuilder();
}

export {
  aStudent,
  aClassRoom,
  anAssignment,
  anEnrolledStudent,
};