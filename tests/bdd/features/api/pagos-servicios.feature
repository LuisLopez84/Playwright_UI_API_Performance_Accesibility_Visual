@API
Feature: Pago de Servicios API

  Scenario Outline: Pago exitoso de servicio
    Given la API está disponible
    When envío un pago con monto "<monto>" y cuenta "<cuenta>"
    Then el código de respuesta debe ser 200
    And la respuesta debe indicar pago exitoso
    And el tiempo de respuesta debe ser menor a "<sla>" ms

    Examples:
      | monto | cuenta | sla  |
      | 1500  | ACC001 | 5000 |
