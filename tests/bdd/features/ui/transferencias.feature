@UI
Feature: Transferencias Bancarias - Entre mis Cuentas

  Scenario Outline: Realizar transferencia exitosa
    Given el usuario autenticado en el sistema
    When navega al modulo Transferencias
    When selecciono entre Mis Cuentas
    When seleciono cuenta origen "<origen>"
    When seleciono cuenta Destino "<destino>"
    When agrego monto "<monto>" descripción "<descripción>"
    When doy clic en el boton Transferir
    When confirmo Popup
    Then debe visualizar confirmación de transferencia

    Examples:
      | origen | destino | monto | descripción |
      | ACC002  | ACC001  | 7  | Prueba Playwright 002  |