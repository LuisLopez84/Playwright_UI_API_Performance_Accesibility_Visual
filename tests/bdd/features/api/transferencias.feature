@API
Feature: Transferencias API

  Scenario Outline: Transferencia exitosa entre cuentas
    Given la API de transferencias está disponible
    When envío una solicitud de transferencia desde "<origen>" hacia "<destino>" por "<monto>"
    Then el código de respuesta debe ser 200

    Examples:
      | origen  | destino | monto |
      | ACC001  | ACC002  | 1000  |
      | ACC002  | ACC003  | 2000  |
