import { When, Then, expect } from '../../../fixtures/world';

When('navega al módulo de pagos', async ({ page }) => {
  await page.locator(
    'aside ul li span',
    { hasText: 'Pago de Servicios' }
  ).click();

  await expect(page.locator('#service-select')).toBeVisible();
});

When(
  'realiza el pago del servicio {string} por valor {string} a la cuenta {string}',
  async ({ page }, servicio, valor, cuenta) => {

    // Usar index como en spec (estable)
    await page.locator('#service-select')
      .selectOption({ index: 3 });

    await page.locator('#service-amount')
      .fill(valor);

    await page.locator('#service-account')
      .selectOption({ index: 2 });
  }
);

When('Clic en el boton Pagar Servicio', async ({ page }) => {
  await page.getByRole('button', { name: 'Pagar Servicio' }).click();
});

Then(
  'debería visualizar el mensaje {string}',
  async ({ page }) => {
    await expect(
      page.getByText('¡Pago Finalizado!')
    ).toBeVisible();
  }
);