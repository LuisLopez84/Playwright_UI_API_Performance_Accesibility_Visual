import { test, expect } from '@playwright/test';

test.describe('Generar Tarjeta Virtual E2E', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.fill('#username', 'demo');
    await page.fill('#password', 'demo123');
    await page.click('#login-btn');
    await expect(page.locator('#app-view')).toBeVisible();
  });


test('Generar Tarjeta Virtual - Happy Path', async ({ page }) => {

  // 1️⃣ Ir a Tarjetas Virtuales
  await page.locator('#menu-item-virtual-card').click();

  // 2️⃣ Generar nueva tarjeta
  await page.locator('#generate-card-btn').click();

  // 3️⃣ Seleccionar cuenta
  await page.locator('#card-account-select')
    .selectOption({ index: 1 });

  // 4️⃣ Validar creación
  const listaTarjetas = page.locator('#virtual-cards-list');

  await expect(listaTarjetas)
    .toContainText('ACTIVA - VINCULADA A');

  });

});
