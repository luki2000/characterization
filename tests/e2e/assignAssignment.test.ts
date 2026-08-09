import { defineFeature, loadFeature } from 'jest-cucumber';
import path from 'path';
import request from 'supertest';
import { app } from '../../src';
import { resetDatabase } from "../fixtures/reset";
import { aClassRoom, anAssignment, aStudent, anEnrolledStudent } from '../fixtures';

const feature = loadFeature(
    path.join(__dirname, '../features/assignAssignment.feature')
)

defineFeature(feature, (test) => {
    let assignment: any;
    let enrolledStudent: any;
    let requestBody: any = {};
    let response: any = {};

    afterEach(async () => {
        await resetDatabase();
    });

    test('Assign a student to an assignment', ({ given, and, when, then }) => {
        const classroomBuilder = aClassRoom().withName("Biology");
        const studentBuilder = aStudent().withName('amy').withRandomEmail();

        given('there is an existing student enrolled to a class', async () => {
            enrolledStudent = await anEnrolledStudent()
                .fromClassRoom(classroomBuilder)
                .and(studentBuilder)
                .build();
        });

        and('an assignment exists for the class', async () => {
            assignment = await anAssignment()
                .fromClassRoom(classroomBuilder)
                .build();
        });

        when('I assign the student the assignment', async () => {
            requestBody = {
                studentId: enrolledStudent.student.id,
                assignmentId: assignment.id,
            };

            response = await request(app)
                .post('/student-assignments')
                .send(requestBody);
        });

        then('the student should be assigned to the assignment', () => {
            expect(response.status).toBe(201);
            expect(response.body.data.studentId).toBe(requestBody.studentId);
            expect(response.body.data.assignmentId).toBe(requestBody.assignmentId);
        });
    });
});
