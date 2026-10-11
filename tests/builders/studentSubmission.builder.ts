import { prisma } from "../../src/database";
import StudentAssignmentBuilder from "./studentAssignment.builder";


class SubmissionBuilder {

    private studentAssignmentBuilder?: StudentAssignmentBuilder;

    from(studentAssignmentBuilder: StudentAssignmentBuilder) {
        this.studentAssignmentBuilder = studentAssignmentBuilder;
        return this;
      }

    async build() {
  
     if(!this.studentAssignmentBuilder) throw new Error('Missing the student assignment');

        const studentAssignment = await this.studentAssignmentBuilder.build();
 
        const assignmentSubmission = await prisma.assignmentSubmission.create({
            data: {
              studentAssignmentId: studentAssignment.id
            },
          },
        );

        return { assignmentSubmission, studentAssignment };
    }     
}

export default SubmissionBuilder;