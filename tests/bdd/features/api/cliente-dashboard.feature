@API
Feature: Cliente Dashboard API

  Scenario Outline: Validación completa del dashboard del cliente
    Given la API del dashboard está disponible
    When consulto el endpoint "/cliente/dashboard"
    Then el código de respuesta debe ser 200
    And el header "content-type" debe contener "application/json"
    And el tiempo de respuesta debe ser menor a "<sla>" ms
    And la estructura del dashboard debe ser válida

    Examples:
      | sla  |
      | 5000 |
