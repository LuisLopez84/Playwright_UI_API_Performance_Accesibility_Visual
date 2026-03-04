@API
Feature: Obtener Transacciones API

  Scenario Outline: Validar listado de transacciones
    Given la API está disponible
    When consulto el endpoint "/transacciones/?limit=10"
    Then el código de respuesta debe ser 200
    And la respuesta debe contener transacciones válidas
    And el tiempo de respuesta debe ser menor a "<sla>" ms

    Examples:
      | sla  |
      | 5000 |
