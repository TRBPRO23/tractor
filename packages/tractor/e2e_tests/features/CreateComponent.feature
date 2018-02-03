Feature: CreateComponent
  In order to describe the behaviour of a part of an application
  As a person who is trying to test an application
  I want to be able to create a new Component
  Scenario: Set Component Name
    When I go to the Component Editor
    And I set the name of a Component
    Then I can see the name of the Component