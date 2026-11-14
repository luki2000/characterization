/// <reference types="jest" />
import { defineFeature, loadFeature } from "jest-cucumber";
import request from "supertest";
import server from "../../src/bootstrap";

const app = server.getApp();
import * as path from "path";
import { CreateUserInput } from "../../../shared/src/api/create-users.input";
import CreateUserInputBuilder from "../builder/create-user-Input.builder";
import { resetDatabase } from "../fixtures/reset";

const feature = loadFeature(
  path.join(__dirname, "../../../shared/tests/features/registration.feature")
);

defineFeature(feature, (test) => {
  afterEach(async() => {
    await resetDatabase();
  });
  test('Successful registration with marketing emails accepted', ({ given, when, then, and }) => {
      let createUserResponse: any = {};
      let addEmailToListResponse: any = {};
      let user: Partial<CreateUserInput>;

    given('I am a new user', () => {
      user = new CreateUserInputBuilder().withRandomDetails().build();
    });

    when('I register with valid account details accepting marketing emails', async () => {
      createUserResponse = await request(app).post('/users/new').send(user);

      addEmailToListResponse = await request(app)
        .post("/marketing/new")
        .send({ email: user.email });
    });

    then('I should be granted access to my account', () => {
      const { data } = createUserResponse.body
      expect(createUserResponse.status).toBe(201);
      expect(data!.id).toBeDefined();
      expect(data!.email).toEqual(user.email);
      expect(data!.firstName).toEqual(user.firstName);
      expect(data!.lastName).toEqual(user.lastName);
      expect(data!.username).toEqual(user.username);
    });

    and('I should expect to receive marketing emails', () => {
      const { success } = addEmailToListResponse.body;
      expect(addEmailToListResponse.status).toBe(201);
      expect(success).toBeTruthy();
    });
  });

  test('Successful registration without marketing emails accepted', ({ given, when, then, and }) => {
      let createUserResponse: any = {};
      let user: Partial<CreateUserInput>;

      given('I am a new user', () => {
        user = new CreateUserInputBuilder().withRandomDetails().build();
      });

      when('I register with valid account details declining marketing emails', async () => {
        createUserResponse = await request(app).post('/users/new').send(user);
      });

      then('I should be granted access to my account', () => {
        const { data } = createUserResponse.body;
        expect(createUserResponse.status).toBe(201);
        expect(data!.id).toBeDefined();
        expect(data!.email).toEqual(user.email);
        expect(data!.firstName).toEqual(user.firstName);
        expect(data!.lastName).toEqual(user.lastName);
        expect(data!.username).toEqual(user.username);
      });

      and('I should not expect to receive marketing emails', () => {
        // The end solution leaves this unimplemented. Declining marketing
        // means this scenario never calls POST /marketing/new. Verifying that
        // Mailchimp was not contacted comes in a later lesson.
      });
  });

  test('Invalid or missing registration details', ({ given, when, then, and }) => {
      let createUserResponse: any = {};
      let user: Partial<CreateUserInput>;
      given('I am a new user', () => {

        user = new CreateUserInputBuilder()
        .withFirstName('John')
        .withEmail('Doe')
        .withUsername('john1@example')
        .build();

      });

      when('I register with invalid account details', async() => {
        createUserResponse = await request(app).post('/users/new').send(user);
      });

      then('I should see an error notifying me that my input is invalid', () => {
        expect(createUserResponse.body.error).toBe('ValidationError')
      });

      and('I should not have been sent access to account details', () => {
        expect(createUserResponse.status).toBe(400)

      });
  });

  test('Account already created with email', ({ given, when, then, and }) => {
    /*
         | firstName | lastName | email             |
      | John      | Doe      | john@example.com  |
      | Alice     | Smith    | alice@example.com |
      | David     | Brown    | david@example.com |

      [
          { firstName: "John", lastName: "Doe", email: "john@example.com" },
          { firstName: "Alice", lastName: "Smith", email: "alice@example.com" },
          { firstName: "David", lastName: "Brown", email: "david@example.com" },
    ]
    */
      let createUserResponse: any = {};
      let createUserResponses: Array<any> = []
      let user: Partial<CreateUserInput>;
      let existingUsers: Array<Partial<CreateUserInput>>;
      given('a set of users already created accounts', async(table) => {
      existingUsers = table.map((user: CreateUserInput) => new CreateUserInputBuilder()
        .withFirstName(user.firstName)
        .withUsername("")
        .withEmail(user.email)
        .withLastName(user.lastName)
        .build());

      createUserResponses = await Promise.all(
          existingUsers.map((person) => request(app).post('/users/new').send(person)),
      );

      user = new CreateUserInputBuilder()
        .withFirstName('john')
        .withUsername("")
        .withEmail(existingUsers[0].email!)
        .withLastName('Doe')
        .build();

      });

      when('new users attempt to register with those emails', async() => {
        createUserResponse = await request(app).post('/users/new').send(user);
      });

      then('they should see an error notifying them that the account already exists', () => {
        expect(createUserResponse.status).toBe(409);
      });

      and('they should not have been sent access to account details', () => {
        const { data, success } = createUserResponse.body;
        expect(success).toBeFalsy();
        expect(data).toBeUndefined();
      });
  });

  test('Username already taken', ({ given, when, then, and }) => {
    /***
     *     When new users attempt to register with already taken usernames
      | firstName | lastName | username     | email                 |
      | Bill      | Bob      | thechosenone | billy@billbob.com     |
      | Max       | Samson   | chillblinton | maxsamson@example.com |
      | Will      | Steff    | greenday     | willsteff@example.com |
     */
      let createUserResponse: any = {};
      let createUserResponses: Array<any> = []
      let user: Partial<CreateUserInput>;
      let existingUsers: Array<Partial<CreateUserInput>>;

      given('a set of users have already created their accounts with valid details', async(table) => {
        existingUsers = table.map((user: CreateUserInput) => new CreateUserInputBuilder()
          .withFirstName(user.firstName)
          .withUsername(user.username)
          .withEmail(user.email)
          .withLastName(user.lastName)
          .build());

        createUserResponses = await Promise.all(
          existingUsers.map((person) => request(app).post('/users/new').send(person)),
      );

      user = new CreateUserInputBuilder()
        .withFirstName('john')
        .withUsername(existingUsers[0].username!)
        .withEmail('johnny@gmail.com')
        .withLastName('Doe')
        .build();
      });

      when('new users attempt to register with already taken usernames', async (table) => {
        createUserResponse = await request(app).post('/users/new').send(user);
      });

      then('they see an error notifying them that the username has already been taken', () => {
        expect(createUserResponse.status).toBe(409);
      });

      and('they should not have been sent access to account details', () => {
        const { data, success } = createUserResponse.body;
        expect(success).toBeFalsy();
        expect(data).toBeUndefined();
      });
  });
});