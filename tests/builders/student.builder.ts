import { faker } from "@faker-js/faker";
import { Prisma } from '@prisma/client';
import { Student } from '@prisma/client';

class StudentBuilder {
    private student: Partial<Student>;
    constructor() {
        this.student = {};
    }

    withName(name: string) {
        this.student.name = name;
        return this;
    }

    withRandomEmail() {
        this.student.email = faker.internet.email;
        return this;
    }

    async build() {
        const student = await prisma.student.create({
            data: {
                name: this.student.name,
                email: this.student.email,
            },
        });
        return student;
    }
}

export default StudentBuilder;