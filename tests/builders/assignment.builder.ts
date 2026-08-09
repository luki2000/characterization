import ClassRoomBuilder from "./class-room.builder";

class AssignmentBuilder {
    private classRoomBuilder: ClassRoomBuilder;

    fromClassRoom(classRoomBuilder: ClassRoomBuilder) {
        this.classRoomBuilder = classRoomBuilder();
        return this;
    }

   async build() {
      if(!this.classRoomBuilder) throw new Error('Class does not exist!');
      
      const classroom = this.classRoomBuilder; 

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