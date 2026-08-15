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
    let enrollmentResult: any;
    let requestBody: any = {};
    let response: any = {};

    afterEach(async () => {
        await resetDatabase();
    });

    test('Assign a student to an assignment', ({ given, and, when, then }) => {

        given('there is an existing student enrolled to a class', async () => {
            enrollmentResult = await anEnrolledStudent()
                .fromClassRoom(aClassRoom().withName("Biology"))
                .and(aStudent().withName('amy').withRandomEmail())
                .build();
        });

        and('an assignment exists for the class', async () => {
            assignment = await anAssignment()
                .fromClassRoom(aClassRoom().withName("Biology"))
                .build();
        });

        when('I assign the student the assignment', async () => {
            requestBody = {
                studentId: enrollmentResult.student.id,
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

    test('Fail to assign a student the same assignment more than once', ({ given, and, when, then }) => {
        const classroomBuilder = aClassRoom().withName("Chemistry");
        const studentBuilder = aStudent().withName('Snaders').withRandomEmail();

        given('there is an existing student enrolled to a class', async () => {
            enrollmentResult = await anEnrolledStudent()
                .fromClassRoom(classroomBuilder)
                .and(studentBuilder)
                .build();

        });

        and('an assignment exists for the class', async () => {
            assignment = await anAssignment()
                .fromClassRoom(classroomBuilder)
                .build();

        });

        and('he is already assigned the assignment', async () => {
            requestBody = {
                studentId: enrollmentResult.student.id,
                assignmentId: assignment.id,
            };

            response = await request(app)
                .post('/student-assignments')
                .send(requestBody);

        });

        when('I assign the student the assignment', async () => {
            response = await request(app)
                .post('/student-assignments')
                .send(requestBody);
        });

        then('the student should not be assigned to the assignment', () => {
            expect(response.status).toBe(409);
            expect(response.body.error).toBe("AlreadyAssignedAssignmentToStudent");
        });
    });

});
