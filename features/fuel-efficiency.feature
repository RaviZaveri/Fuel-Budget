# language: en
Feature: Fuel Efficiency Calculator
  As a road trip planner
  I want a tool that calculates the cost-per-kilometer for my vehicle
  So that I can manage my travel expenses

  Background:
    Given the Fuel Efficiency Buddy application is running

  Scenario: Calculate fuel cost for round trip - Budget Friendly
    Given the user enters distance of 200 km one-way
    And the user selects round-trip option
    And the user enters fuel efficiency of 8 L/100km
    And the user enters fuel price of $1.20 per liter
    When the user clicks calculate
    Then the total distance should be 400 km
    And the total fuel cost should be $38.40
    And the status should be "Budget Friendly"

  Scenario: Calculate fuel cost for round trip - Not Budget Friendly
    Given the user enters distance of 500 km one-way
    And the user selects round-trip option
    And the user enters fuel efficiency of 10 L/100km
    And the user enters fuel price of $1.50 per liter
    When the user clicks calculate
    Then the total distance should be 1000 km
    And the total fuel cost should be $150.00
    And the status should be "Not Budget Friendly"

  Scenario: Calculate fuel cost for one-way trip
    Given the user enters distance of 300 km one-way
    And the user selects one-way option
    And the user enters fuel efficiency of 7 L/100km
    And the user enters fuel price of $1.40 per liter
    When the user clicks calculate
    Then the total distance should be 300 km
    And the total fuel cost should be $29.40
    And the status should be "Budget Friendly"

  Scenario: Calculate cost per kilometer
    Given the user enters distance of 150 km one-way
    And the user selects round-trip option
    And the user enters fuel efficiency of 9 L/100km
    And the user enters fuel price of $1.35 per liter
    When the user clicks calculate
    Then the cost per kilometer should be $0.12

  Scenario: Edge case - Zero distance
    Given the user enters distance of 0 km one-way
    And the user selects round-trip option
    And the user enters fuel efficiency of 10 L/100km
    And the user enters fuel price of $1.50 per liter
    When the user clicks calculate
    Then an error message should be displayed "Distance must be greater than 0"

  Scenario: Edge case - Zero fuel efficiency
    Given the user enters distance of 100 km one-way
    And the user selects round-trip option
    And the user enters fuel efficiency of 0 L/100km
    And the user enters fuel price of $1.50 per liter
    When the user clicks calculate
    Then an error message should be displayed "Fuel efficiency must be greater than 0"

  Scenario: Edge case - Zero fuel price
    Given the user enters distance of 100 km one-way
    And the user selects round-trip option
    And the user enters fuel efficiency of 8 L/100km
    And the user enters fuel price of $0.00 per liter
    When the user clicks calculate
    Then the total fuel cost should be $0.00
    And the status should be "Budget Friendly"

  # US Unit Tests (Miles + Gallons)
  Scenario: Calculate fuel cost using US units - Miles and Gallons
    Given the user selects distance unit as "miles"
    And the user selects volume unit as "gallons"
    And the user enters distance of 100 miles one-way
    And the user selects one-way option
    And the user enters fuel efficiency of 30 MPG
    And the user enters fuel price of $3.00 per gallon
    When the user clicks calculate
    Then the total distance should be 100 miles
    And the total fuel should be 3.33 gallons
    And the total fuel cost should be $10.00
    And the status should be "Budget Friendly"

  Scenario: Calculate fuel cost using US units - Not Budget Friendly
    Given the user selects distance unit as "miles"
    And the user selects volume unit as "gallons"
    And the user enters distance of 200 miles one-way
    And the user selects round-trip option
    And the user enters fuel efficiency of 20 MPG
    And the user enters fuel price of $4.00 per gallon
    When the user clicks calculate
    Then the total distance should be 400 miles
    And the total fuel should be 20 gallons
    And the total fuel cost should be $80.00
    And the status should be "Budget Friendly"

  Scenario: Calculate cost per mile using US units
    Given the user selects distance unit as "miles"
    And the user selects volume unit as "gallons"
    And the user enters distance of 150 miles one-way
    And the user selects round-trip option
    And the user enters fuel efficiency of 25 MPG
    And the user enters fuel price of $3.50 per gallon
    When the user clicks calculate
    Then the cost per mile should be $0.07

  # Unit Conversion Verification
  Scenario: Verify metric to US conversion accuracy
    Given the user selects distance unit as "miles"
    And the user selects volume unit as "gallons"
    And the user enters distance of 310 miles one-way
    And the user selects round-trip option
    And the user enters fuel efficiency of 25 MPG
    And the user enters fuel price of $3.50 per gallon
    When the user clicks calculate
    Then the total distance should be 620 miles
    And the total fuel should be 24.8 gallons
    And the total fuel cost should be $86.80