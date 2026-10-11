Feature: Create a student

    As an Adminstrator
    I would like to create a student
    so that he can be assigned to a class

    Scenario: Successfully create a student
        Given that I want to create a student with name "Jane doe" and email "jane@random.ch"
        When I send a request to create s student
        Then the student should succesfully be created