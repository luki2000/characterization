Feature: Submit a student assignment

    As a Student
    I want to submit as assignment
    So that it can be graded

    Scenario: Submit an assignment
        Given that the student has completed his assginment 
        When the student submits the assignment
        Then the assignment should be succesfully submitted

    Scenario: Assginment already submitted
        Given that the student has already submitted their assginment 
        When the student submits the same assignment again
        Then the submission should be rejected
