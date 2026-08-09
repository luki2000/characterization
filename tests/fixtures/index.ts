import AssignStudentBuilder from "../builders/assign-student.builder";
import AssignmentBuilder from "../builders/assignment.builder";
import ClassRoomBuilder from "../builders/class-room.builder";
import StudentEnrollementBuilder from "../builders/enrolled-student.builder";
import StudentBuilder from "../builders/student.builder";



function aStudent() {
  return new StudentBuilder();
}

function aClassRoom () {
  return new ClassRoomBuilder()
}

function anAssignment () {
  return new AssignmentBuilder();
}

function anEnrolledStudent () {
  return new StudentEnrollementBuilder();
}

function anAssignStudent() {
  return new AssignStudentBuilder()
}

export {
  aStudent,
  aClassRoom,
  anAssignment,
  anAssignStudent,
  anEnrolledStudent,
};