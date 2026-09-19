Feature: Grade an assignment

    As a teacher
    I want to grade a submitted assignment
    So that we can track the student's learning progress

    Scenario: Successfully grade a submitted assignment
        Given a student has submitted an assignment
        When I grade the assignment
        Then the assignment should be marked as graded

    Scenario: Fail to grade an assignment that is not submitted
        Given a student has been assigned an assignment but has not submitted it
        When I grade the assignment
        Then the assignment should not be marked as graded

    Scenario: Fail to re-grade a graded assignment
        Given the assignment has already been graded
        When I grade the assignment again
        Then the assignment should not be re-graded