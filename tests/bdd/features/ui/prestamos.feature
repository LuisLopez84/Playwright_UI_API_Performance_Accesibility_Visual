@UI
Feature: Solicitud de Préstamo

  Scenario Outline: Crear préstamo exitosamente
    Given el usuario autenticado en el sistema
    When navega al modulo de Prestamos
    When selecciona cuenta destino
    When ingresa monto "<monto>"
    When selecciona numero de cuotas
    When da clic en el botón Solicitar Préstamo
    When da clic en Confirmar
    Then debe visualizar mensaje de préstamo aprobado

    Examples:
      | monto |
      | 5000  |