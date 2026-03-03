import { When, Then, expect } from '../../../fixtures/world';

When('navega al modulo de Prestamos', async ({ page }) => {
  const prestamosMenu = page.locator(
    '#app-view aside ul li span',
    { hasText: 'Préstamos' }
  );

  await expect(prestamosMenu).toBeVisible();
  await prestamosMenu.click();
});

When('selecciona cuenta destino', async ({ page }) => {
  await expect(page.locator('#loan-destination-account')).toBeVisible();
  await page.locator('#loan-destination-account')
    .selectOption('ACC002');
});

When('ingresa monto {string}', async ({ page }, monto) => {
    await page.locator('#loan-amount')
      .fill(monto);
});

When('selecciona numero de cuotas', async ({ page }) => {
  await page.locator('#loan-installments')
    .selectOption({ label: '18 cuotas' });
});

When('da clic en el botón Solicitar Préstamo', async ({ page }) => {
  await page.locator('#loan-form button').click();
});

When('da clic en Confirmar', async ({ page }) => {
  await page.locator('#modal-confirm').click();
});

Then('debe visualizar mensaje de préstamo aprobado', async ({ page }) => {

  await expect(
    page.getByText('Préstamo acreditado exitosamente')
  ).toBeVisible();

  const loansSection = page.locator('#loans-section');
  await expect(loansSection).toBeVisible();

  const ultimoPrestamo = page
    .locator('#active-loans-list .deposit-item')
    .last();

  await expect(ultimoPrestamo).toContainText('Cuotas: 18');
});