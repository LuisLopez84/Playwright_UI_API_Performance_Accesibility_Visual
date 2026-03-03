@API
Feature: Obtener Cuentas API

  Scenario Outline: Validar contrato y reglas de negocio de cuentas
    Given la API está disponible
    When consulto el endpoint "/cuentas/"
    Then el código de respuesta debe ser 200
    And la respuesta debe contener cuentas válidas
    And el tiempo de respuesta debe ser menor a "<sla>" ms

    Examples:
      | sla  |
      | 5000 |
