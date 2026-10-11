Feature: Enroll sudent to class

    As a teacher
    I want to enroll a student to a class
    so that he can attend the class

    Scenario: Succesfully enroll student to class
        Given that there is a student and class
        When I enroll the student to the class
        Then the student should be enrolled to the class

    Scenario: Fail to enroll student with a none existing class
        Given that there is a student
        When I enroll the student to a class that does not exist
        Then the student should not be enrolled

    Scenario: Student is already enrolled to the class
        Given the student is already enrolled in the class
        When I enroll the student to the same class again
        Then the enrollment should be rejected
        