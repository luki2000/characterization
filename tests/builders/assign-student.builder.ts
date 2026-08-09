import { Class, Student } from "@prisma/client";
import { prisma } from "../../src/database";
import ClassRoomBuilder from "./class-room.builder";
import StudentBuilder from "./student.builder";


class AssignStudentBuilder {

    private student?: StudentBuilder;
    private classRoom?: ClassRoomBuilder;

    fromClassRoom(classRoomBuilder: ClassRoomBuilder) {
       this.classRoom = classRoomBuilder;
        return this;
    }

    and(studentBuilder: StudentBuilder) {
        this.student = studentBuilder;
        return this;

    }

    async build() {
        if(!this.student) throw new Error('No student');
        if(!this.classRoom) throw new Error('No classRoom');

        const student = await this.student.build();
        const classRoom = await this.classRoom.build();

        const assignStudent = await prisma.classEnrollment.create({
            data: {
                studentId: student.id,
                classId: classRoom.id,
            }
        })

        return assignStudent;
    }
}

export default AssignStudentBuilder;