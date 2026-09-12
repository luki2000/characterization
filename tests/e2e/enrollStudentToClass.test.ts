import { defineFeature, loadFeature } from 'jest-cucumber';
import path from 'path';
import request from 'supertest';
import { app } from "../../src/index";
import { resetDatabase } from "../fixtures/reset";
import { aClassRoom, anEnrolledStudent, aStudent } from '../fixtures';
import StudentEnrollementBuilder from '../builders/enrolled-student.builder';

const feature = loadFeature(
    path.join(__dirname, '../features/enrollStudentToClass.feature')
)

defineFeature(feature, (test) => {
    afterEach(async () => {
        await resetDatabase();
    });

    test('Succesfully enroll student to class', ({ given, when, then }) => {
        let requestBody: any = {};
        let response: any = {};
        let student: any;
        let classRoom: any;



        given('that there is a student and class', async() => {
            student = await aStudent()
                .withName('bob')
                .withRandomEmail()
                .build();
            classRoom = await aClassRoom()
                .withName('Biology')
                .build();
        });

        when('I enroll the student to the class', async () => {
            requestBody = {
                studentId: student.id,
                classId: classRoom.id,
            };
            
            response = await request(app).post('/class-enrollments').send(requestBody);
        });

        then('the student should be enrolled to the class', () => {
            expect(response.status).toBe(201);
            expect(response.body.data).toBeTruthy();
        });
    });

    test('Fail to enroll student with a none existing class', ({ given, when, then }) => {
        let requestBody: any = {};
        let response: any = {};
        let student: any;
        
        given('that there is a student', async () => {
            student = await aStudent()
                .withName('bob')
                .withRandomEmail()
                .build();
        });

        when('I enroll the student to a class that does not exist', async () => {
            let randomUUID = Math.floor(Math.random()*100) + 'testUuid';
            requestBody = {
                studentId: student.id,
                classId: randomUUID,
            };
            
            response = await request(app).post('/class-enrollments').send(requestBody);
       
        });

        then('the student should not be enrolled', () => {
            expect(response.status).toBe(404);
            expect(response.body.data).toBeUndefined();
        });
    });

    test('Student is already enrolled to the class', ({ given, when, then }) => {
        let requestBody: any = {};
        let response: any = {};
        let student: any;
        let classRoom: any;

        given('the student is already enrolled in the class', async() => {
            student = await aStudent()
                .withName('bob')
                .withRandomEmail()
                .build();
            classRoom = await aClassRoom()
                .withName('Biology')
                .build();

            requestBody = {
                    studentId: student.id,
                    classId: classRoom.id,
            };    
            await request(app).post('/class-enrollments').send(requestBody);
            

        });

        when('I enroll the student to the same class again', async() => {
            response = await request(app).post('/class-enrollments').send(requestBody);
        });

        then('the enrollment should be rejected', () => {
            expect(response.status).toBe(409);
            expect(response.body.error).toBe("StudentAlreadyEnrolled");
        });
    });
});