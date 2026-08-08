import { defineFeature, loadFeature } from 'jest-cucumber';
import path from 'path';
import request from 'supertest';
import { app } from "../../src/index";
import { resetDatabase } from "../fixtures/reset";

class enrolledStudent {

}

class AssignmentBuilder {

}

const feature = loadFeature(
    path.join(__dirname, '../features/assignAssignment.feature')
)

defineFeature(feature, (test) => {
    afterEach(async () => {
        await resetDatabase();
    });
    test('Assign a student to an assignment', ({ given, and, when, then }) => {
        given('there is an existing student enrolled to a class', () => {
            const enrolledStudent = 
        });

        and('an assignment exists for the class', () => {

        });

        when('I assign the student the assignment', () => {

        });

        then('the student should be assigned to the assignment', () => {

        });
    });
});