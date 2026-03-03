import { When, Then, expect } from '../../../fixtures/world';

When('navega al modulo Plazos Fijos', async ({ page }) => {
  const plazoMenu = page.locator(
      '#app-view aside ul li span',
      { hasText: 'Plazos Fijos' }
    );

    await expect(plazoMenu).toBeVisible();
    await plazoMenu.click();
});

When('selecciona cuenta origen {string}', async ({ page }, cuenta) => {
    await expect(page.locator('#deposit-source-account')).toBeVisible();
    await page.locator('#deposit-source-account')
  .selectOption('ACC001');
});

When('selecciona {string} a invertir', async ({ page }, monto) => {
  // Monto
  await page.fill('#deposit-amount', '1001');
});

When('selecciona plazo', async ({ page }, monto) => {
	await page.locator('#deposit-term')
  .selectOption({ label: '30 días - 35% TNA' });
});

When('crea plazo fijo', async ({ page }, monto) => {
	await page.locator('#fixed-deposit-form button').click();
});

When('da clic en el boton confirmar', async ({ page }, monto) => {
	await page.locator('#modal-confirm').click();
});

Then('debe visualizar mensaje de creación exitosa', async ({ page }) => {
  await expect(
      page.getByText('Plazo fijo creado exitosamente')
    ).toBeVisible();
});