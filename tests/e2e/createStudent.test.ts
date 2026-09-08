import { defineFeature, loadFeature } from 'jest-cucumber';
import path from 'path';
import request from 'supertest';
import { app } from "../../src/index";
import { resetDatabase } from "../fixtures/reset";

const feature = loadFeature(
    path.join(__dirname, '../features/createStudent.feature')
)

defineFeature(feature, (test) => {
    afterEach(async () => {
        await resetDatabase();
    });

    test('Successfully create a student', ({ given, when, then }) => {
        let requestBody: any;
        let response: any;
        
        given(/^that I want to create a student with name "(.*)" and email "(.*)"$/, (name, email) => {
            requestBody = {
                name,
                email,
            };
        });

        when('I send a request to create s student', async () => {
            response = await request(app).post('/students').send(requestBody);
        });

        then('the student should succesfully be created', () => {
            expect(response.body.success).toBeTruthy();
            expect(response.status).toBe(201);
        });
    });
});