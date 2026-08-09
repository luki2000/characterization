import { prisma } from "../../src/database";
import ClassRoomBuilder from "./class-room.builder";

class AssignmentBuilder {
    private classRoomBuilder?: ClassRoomBuilder;

    fromClassRoom(classRoomBuilder: ClassRoomBuilder) {
        this.classRoomBuilder = classRoomBuilder;
        return this;
    }

   async build() {
      if (!this.classRoomBuilder) throw new Error('Class does not exist!');

      const classroom = await this.classRoomBuilder.build();

      const assignment = await prisma.assignment.create({
        data: {
          classId: classroom.id,
          title: classroom.name,
        },
      });

      return assignment;
    }
}

export default AssignmentBuilder;