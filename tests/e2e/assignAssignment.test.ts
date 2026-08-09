import { defineFeature, loadFeature } from 'jest-cucumber';
import path from 'path';
import request from 'supertest';
import { app } from "../../src/index";
import { resetDatabase } from "../fixtures/reset";
import StudentBuilder from '../builders/student.builder';
import { anAssignment, aStudent, aClassRoom } from '../fixtures/index.ts'

class AssignmentBuilder {

}

const feature = loadFeature(
    path.join(__dirname, '../features/assignAssignment.feature')
)

defineFeature(feature, (test) => {

    let student;
    let classRoom;
    let assignment;

    afterEach(async () => {
        await resetDatabase();
    });
    test('Assign a student to an assignment', ({ given, and, when, then }) => {
        given('there is an existing student enrolled to a class', async () => {
            student = await aStudent()
                .withName('Jonathan')
                .withRandomEmail()
                .build();
        });

        and('an assignment exists for the class', async () => {
            assignement = await anAssignment()
                .fromClassRoom(
                    aClassRoom()
                        .withName('Math')
                        .build()
            );
        });

        when('I assign the student the assignment', () => {

        });

        then('the student should be assigned to the assignment', () => {

        });
    });
});