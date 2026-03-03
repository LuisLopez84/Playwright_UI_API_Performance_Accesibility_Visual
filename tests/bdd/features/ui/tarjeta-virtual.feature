@UI
Feature: Generar Tarjeta Virtual

  Scenario: Crear tarjeta virtual exitosamente
    Given el usuario autenticado en el sistema
    When navega al modulo Tarjetas Virtuales
    When da click en Generar nueva tarjeta
    When Selecciona una cuenta
    Then debe visualizar ACTIVA - VINCULADA A