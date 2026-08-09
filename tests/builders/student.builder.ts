import { faker } from "@faker-js/faker";
import { Student } from '@prisma/client';
import { prisma } from "../../src/database";

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
        this.student.email = faker.internet.email();
        return this;
    }

    async build() {
        const student = await prisma.student.create({
            data: {
                name: this.student.name as string,
                email: this.student.email as string,
            },
        });
        return student;
    }
}

export default StudentBuilder;