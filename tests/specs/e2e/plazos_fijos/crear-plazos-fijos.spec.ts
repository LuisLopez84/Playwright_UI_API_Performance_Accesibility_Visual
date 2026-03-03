import { test, expect } from '@playwright/test';

test.describe('Plazo Fijo E2E', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.fill('#username', 'demo');
    await page.fill('#password', 'demo123');
    await page.click('#login-btn');
    await expect(page.locator('#app-view')).toBeVisible();
  });

  test('Crear nuevo plazo fijo - Happy Path', async ({ page }) => {

    // =============================
    // 1️⃣ Ir a Plazos Fijos
    // =============================

    const plazoMenu = page.locator(
      '#app-view aside ul li span',
      { hasText: 'Plazos Fijos' }
    );

    await expect(plazoMenu).toBeVisible();
    await plazoMenu.click();

    // =============================
    // 2️⃣ Cuenta origen
    // =============================

    await expect(page.locator('#deposit-source-account')).toBeVisible();

    await page.locator('#deposit-source-account')
  .selectOption('ACC001');

    // =============================
    // 3️⃣ Monto invertir
    // =============================

    await page.fill('#deposit-amount', '1001');

    // =============================
    // 4️⃣ Seleccionar plazo
    // =============================

    await page.locator('#deposit-term')
  .selectOption({ label: '30 días - 35% TNA' });

    // =============================
    // 5️⃣ Crear Plazo Fijo
    // =============================

    await page.locator('#fixed-deposit-form button').click();

    // =============================
    // 6️⃣ Confirmar
    // =============================

    await page.locator('#modal-confirm').click();

    // =============================
    // 7️⃣ Validar mensaje éxito
    // =============================

    await expect(
      page.getByText('Plazo fijo creado exitosamente')
    ).toBeVisible();

  });

});
