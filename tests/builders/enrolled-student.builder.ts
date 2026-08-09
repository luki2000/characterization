import ClassRoomBuilder from "./class-room.builder";
import StudentBuilder from "./student.builder";

class StudentEnrollementBuilder {
    private classRoomBuilder: ClassRoomBuilder;
    private studentBuilder: StudentBuilder;

   fromClassRoom(classRoomBuilder: ClassRoomBuilder) {
        this.classRoomBuilder = classRoomBuilder;
        return this;
   }

   and(studentBuilder: StudentBuilder) {
        this.studentBuilder = studentBuilder;
        return this;
   }

   async build() {
        if(!this.classRoomBuilder) throw new Error('Missing class!');
        if(!this.studentBuilder) throw new Error('Missing student');

        let classRoom = await this.classRoomBuilder.build();
        let student = await this.studentBuilder.build();
        
        const enrolledStudent = await prisma.classEnrollment.upsert({
          where: {
            studentId_classId: {
              studentId: student.id,
              classId: classRoom.id
            }
          },
          create: {
            studentId: student.id,
            classId: classRoom.id
          },
          update: {
            studentId: student.id,
            classId: classRoom.id
          }
        });
    
        return { student, classRoom, enrolledStudent };
   }
}

export default StudentEnrollementBuilder;