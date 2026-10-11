import { prisma } from "../../src/database";
import AssignmentBuilder from "./assignment.builder";
import StudentEnrollementBuilder from "./enrolled-student.builder";


class StudentAssignmentBuilder {

    private assignment?: AssignmentBuilder;
    private enrolledStudent?:StudentEnrollementBuilder;

    from(assignment: AssignmentBuilder) {
       this.assignment = assignment;
        return this;
    }

    and(enrolledStudent: StudentEnrollementBuilder) {
        this.enrolledStudent = enrolledStudent;
        return this;
    }

    async build() {
        if (!this.assignment) throw new Error('Missing assignment');
        if (!this.enrolledStudent) throw new Error('Missing enrollment');
        const assignment = await this.assignment.build();
        const { student } = await this.enrolledStudent.build();
        return prisma.studentAssignment.create({
          data: {
            studentId: student.id,
            assignmentId: assignment.id,
          },
        });
    }
}

export default StudentAssignmentBuilder;