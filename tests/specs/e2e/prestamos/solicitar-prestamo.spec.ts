import { test, expect } from '@playwright/test';

test.describe('Prestamos E2E', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.fill('#username', 'demo');
    await page.fill('#password', 'demo123');
    await page.click('#login-btn');
    await expect(page.locator('#app-view')).toBeVisible();
  });

  test('Solicitar nuevo préstamo - Happy Path', async ({ page }) => {

    const montoSolicitado = '1002';

    // =============================
    // 1️⃣ Ir a Préstamos
    // =============================

    const prestamosMenu = page.locator(
      '#app-view aside ul li span',
      { hasText: 'Préstamos' }
    );

    await expect(prestamosMenu).toBeVisible();
    await prestamosMenu.click();

    // =============================
    // 2️⃣ Seleccionar cuenta destino
    // =============================

    await expect(page.locator('#loan-destination-account')).toBeVisible();

    await page.locator('#loan-destination-account')
  .selectOption('ACC002');

    // =============================
    // 3️⃣ Ingresar monto
    // =============================

    await page.fill('#loan-amount', montoSolicitado);

    // =============================
    // 4️⃣ Seleccionar cuotas (18)
    // =============================

    await page.locator('#loan-installments')
  .selectOption({ label: '18 cuotas' });

    // =============================
    // 5️⃣ Click Solicitar Préstamo
    // =============================

    await page.locator('#loan-form button').click();

    // =============================
    // 6️⃣ Confirmar
    // =============================

    await page.locator('#modal-confirm').click();

    // =============================
    // 7️⃣ Validar mensaje éxito
    // =============================

    await expect(
      page.getByText('Préstamo acreditado exitosamente')
    ).toBeVisible();

    // =============================
    // 8️⃣ Validar que aparece en "Mis Préstamos Activos"
    // =============================

    const loansSection = page.locator('#loans-section');

    await expect(loansSection).toBeVisible();

  const ultimoPrestamo = page
  .locator('#active-loans-list .deposit-item')
  .last();

  await expect(ultimoPrestamo).toContainText('$ 1.002,00');
  await expect(ultimoPrestamo).toContainText('Cuotas: 18');


  });
});
