import { Class } from '@prisma/client';
import { prisma } from '../../src/database';

class ClassRoomBuilder {
    private classRoom: Partial<Class>;
    constructor() {
        this.classRoom = {};
    }

    withName(name: string) {
        this.classRoom.name = name;
        return this;
    }

    async build() {
        const classRoom = await prisma.class.upsert({
            where: {
                name: this.classRoom.name as string,
            },
            create: {
                name: this.classRoom.name as string,
            },
            update: {
                name: this.classRoom.name as string,
            },
        });
        return classRoom;
    }
}

export default ClassRoomBuilder;