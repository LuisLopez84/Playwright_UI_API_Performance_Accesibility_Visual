@UI
Feature: Pago de Servicios

  Scenario Outline: Pago exitoso de servicio
    Given el usuario autenticado en el sistema
    When navega al módulo de pagos
    When realiza el pago del servicio "<servicio>" por valor "<valor>" a la cuenta "<cuenta>"
    When Clic en el boton Pagar Servicio
    Then debería visualizar el mensaje "¡Pago Finalizado!"

    Examples:
      | servicio    | valor | cuenta                                   |
      | Agua - AySA | 50000 | Tarjeta de Crédito - **** **** **** 9012 |
