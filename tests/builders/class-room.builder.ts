import { Prisma } from '@prisma/client';
import { Class } from '@prisma/client';

class ClassRoomBuilder {
    private classRoom;
    constructor() {
        this.class: Partial<Class> = {};
    }

    withName(name: string) {
        this.classRoom.name = name;
        return this;
    }

    async build() {
        const classRoom = await prisma.class.create({
            data: {
                name: this.classRoom.name,
            },
        });
        return classRoom;
    }
}

export default ClassRoomBuilder;