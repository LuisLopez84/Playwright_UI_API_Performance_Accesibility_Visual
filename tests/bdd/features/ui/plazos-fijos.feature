@UI
Feature: Crear Plazo Fijo

  Scenario Outline: Crear nuevo plazo fijo exitosamente
    Given el usuario autenticado en el sistema
    When navega al modulo Plazos Fijos
    When selecciona cuenta origen "<cuenta>"
    When selecciona "<monto>" a invertir
    When selecciona plazo
    When crea plazo fijo
    When da clic en el boton confirmar
    Then debe visualizar mensaje de creación exitosa

    Examples:
      | cuenta | monto |
      | ACC001 | 1001  |