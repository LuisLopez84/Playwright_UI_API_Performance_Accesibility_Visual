import { test, expect } from '@playwright/test';

test.describe('Pago de Servicios E2E', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.fill('#username', 'demo');
    await page.fill('#password', 'demo123');
    await page.click('#login-btn');
    await expect(page.locator('#app-view')).toBeVisible();
  });

test('Pago de Servicios - Happy Path', async ({ page }) => {

  // 1️⃣ Ir a Pago de Servicios
  await page.locator('aside ul li span', { hasText: 'Pago de Servicios' }).click();

  // 2️⃣ Seleccionar servicio (option 4)
  await page.locator('#service-select').selectOption({ index: 3 });

  // 3️⃣ Ingresar monto
  await page.locator('#service-amount').fill('8500');

  // 4️⃣ Seleccionar cuenta (option 3)
  await page.locator('#service-account').selectOption({ index: 2 });

  // 5️⃣ Click en Pagar Servicio
  await page.getByRole('button', { name: 'Pagar Servicio' }).click();

  // 6️⃣ Validar mensaje
  await expect(page.getByText('¡Pago Finalizado!')).toBeVisible();

  });

});
