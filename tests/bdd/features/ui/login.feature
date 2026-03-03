@UI
Feature: Login Bancario

  Scenario Outline: Login exitoso
    Given el usuario navega al login
    When ingresa usuario "<user>" y contraseña "<pass>"
    Then debe visualizar el dashboard principal

    Examples:
      | user | pass    |
      | demo | demo123 |
