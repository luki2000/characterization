import { defineFeature, loadFeature } from 'jest-cucumber';
import path from 'path';
import request from 'supertest';
import { app } from '../../src';
import { resetDatabase } from "../fixtures/reset";
import { aClassRoom, anAssignment, aStudent, anEnrolledStudent } from '../fixtures';

const feature = loadFeature(
    path.join(__dirname, '../features/gradeAssignment.feature')
)

defineFeature(feature, (test) => {
    let requestBody: any = {};
    let response: any = {};

    afterEach(async () => {
        await resetDatabase();
    });

    test('Successfully grade a submitted assignment', ({ given, when, then }) => {
        given('a student has submitted an assignment', () => {

        });

        when('I grade the assignment', () => {

        });

        then('the assignment should be marked as graded', () => {

        });
    });

    test('Fail to grade an assignment that is not submitted', ({ given, when, then }) => {
        given('a student has been assigned an assignment but has not submitted it', () => {

        });

        when('I grade the assignment', () => {

        });

        then('the assignment should not be marked as graded', () => {

        });
    });

    test('Fail to re-grade a graded assignment', ({ given, when, then }) => {
        given('the assignment has already been graded', () => {

        });

        when('I grade the assignment again', () => {

        });

        then('the assignment should not be re-graded', () => {

        });
    });
});
