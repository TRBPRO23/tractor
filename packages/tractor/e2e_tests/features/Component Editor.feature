Feature: Component Editor
  In order to describe the behaviour of UI Components for my app
  As a person who wants to create Protractor tests
  I want to be able to edit Component files
  Scenario: Create Component
    Given GET /file-structure is a pass-through
    And GET /config is a pass-through
    When I go to the Component Editor
    Given GET /variable-name-valid is a pass-through
    When I enter a Component name
    Given GET /components/file/path is a pass-through
    And PUT /components/file is a pass-through
    When I save the Component
    Then I can see that the Component was saved
  Scenario: Open Component
    Given GET /file-structure is a pass-through
    And GET /config is a pass-through
    When I go to the Component Editor
    Given GET /components/file/path is a pass-through
    And GET /variable-name-valid is a pass-through
    When I open a Component
    Then I can see the Component in the Editor
  Scenario: Add Element
    Given GET /file-structure is a pass-through
    And GET /config is a pass-through
    When I go to the Component Editor
    Given GET /components/file/path is a pass-through
    And GET /variable-name-valid is a pass-through
    When I open a Component
    And I create an Element
    And I save the Component
    And I reload the app
    Then I can see the Element in the editor