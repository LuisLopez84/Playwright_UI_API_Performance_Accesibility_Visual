 @API
  Feature: Performance Dashboard

  Scenario Outline: Validar SLA del dashboard
    When consulto el endpoint "/cliente/dashboard"
    Then el código de respuesta debe ser 200
    And el tiempo de respuesta debe ser menor a "<sla>" ms

    Examples:
      | sla  |
      | 3000 |
      | 5000 |
