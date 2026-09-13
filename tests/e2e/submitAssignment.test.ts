import { defineFeature, loadFeature } from 'jest-cucumber';
import path from 'path';
import request from 'supertest';
import { app } from "../../src/index";
import { resetDatabase } from "../fixtures/reset";
import { aClassRoom, anAssignment, anEnrolledStudent, aStudent, aStudentAssignment, aSubmittedAssignment } from '../fixtures';

const feature = loadFeature(
    path.join(__dirname, '../features/submitAssignment.feature')
)

defineFeature(feature, (test) => {
    afterEach(async () => {
        await resetDatabase();
    });

    test('Submit an assignment', ({ given, when, then }) => {
        let studentAssignment: any;

        let requestBody;
        let response: any;
        let classRoomName = 'Biology';
        given('that the student has completed his assginment', async () => {
            studentAssignment = await aStudentAssignment()
                .from(anAssignment().fromClassRoom(aClassRoom().withName(classRoomName)))
                .and(anEnrolledStudent().fromClassRoom(aClassRoom().withName(classRoomName)).and(aStudent().withName('ben').withRandomEmail())
                ).build();  

            });

        when('the student submits the assignment', async () => {
            requestBody = {
                studentId: studentAssignment.studentId,
                assignmentId: studentAssignment.assignmentId,
            };

            response = await request(app).post('/student-assignments/submit')
                .send(requestBody);
        });

        then('the assignment should be succesfully submitted', () => {
            expect(response.status).toBe(201);
        });
    });

    test('Assginment already submitted', ({ given, when, then }) => {
        let studentAssignment: any;
        let submittedAssignment: any;
        let requestBody;
        let response: any;

        let classRoomName = 'Biology';
        
        given('that the student has already submitted their assginment', async () => {
            studentAssignment = aStudentAssignment()
                .from(anAssignment().fromClassRoom(aClassRoom().withName(classRoomName)))
                .and(anEnrolledStudent().fromClassRoom(aClassRoom().withName(classRoomName)).and(aStudent().withName('hannah').withRandomEmail()));
                
            submittedAssignment = await aSubmittedAssignment().from(studentAssignment).build();
        });
        

        when('the student submits the same assignment again', async() => {
            requestBody = {
                studentId: submittedAssignment.studentAssignment.studentId,
                assignmentId: submittedAssignment.studentAssignment.assignmentId,  
            };

            response = await request(app).post('/student-assignments/submit')
                .send(requestBody);
        });

        then('the submission should be rejected', () => {
            expect(response.status).toBe(409);
        });
    });

});