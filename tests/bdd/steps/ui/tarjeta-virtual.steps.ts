import { When, Then, expect } from '../../../fixtures/world';

When('navega al modulo Tarjetas Virtuales', async ({ page }) => {
  await page.locator('#menu-item-virtual-card').click();
});

When('da click en Generar nueva tarjeta', async ({ page }) => {
  await page.locator('#generate-card-btn').click();
});

When('Selecciona una cuenta', async ({ page }) => {
  await page.locator('#card-account-select')
    .selectOption({ index: 1 });
});


Then('debe visualizar ACTIVA - VINCULADA A', async ({ page }) => {
  const listaTarjetas = page.locator('#virtual-cards-list');

  await expect(listaTarjetas)
    .toContainText('ACTIVA - VINCULADA A');
});