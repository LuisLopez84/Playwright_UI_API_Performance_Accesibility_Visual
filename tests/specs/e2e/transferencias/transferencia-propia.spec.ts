import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.fill('#username', 'demo');
  await page.fill('#password', 'demo123');
  await page.click('#login-btn');
  await expect(page.locator('#app-view')).toBeVisible();
});

test('Transferencia entre mis cuentas - Happy Path', async ({ page }) => {

  // =============================
  // 2️⃣ IR A TRANSFERENCIAS
  // =============================

  const transferMenu = page.locator(
    '#app-view aside ul li span',
    { hasText: 'Transferencias' }
  );

  await expect(transferMenu).toBeVisible();
  await transferMenu.click();

await expect(page.locator('#transfer-type')).toBeVisible();


  // =============================
  // 3️⃣ SELECCIONAR ENTRE MIS CUENTAS
  // =============================

await page.locator('#transfer-type')
  .selectOption({ label: 'Entre mis cuentas' });


  // =============================
  // 4️⃣ CUENTA ORIGEN
  // =============================

await page.locator('#source-account')
  .selectOption('ACC002');

  // =============================
  // 5️⃣ CUENTA DESTINO
  // =============================

await page.locator('#destination-own-account')
  .selectOption('ACC001');

  // =============================
  // 6️⃣ MONTO Y DESCRIPCIÓN
  // =============================

  await page.fill('#transfer-amount', '5');
  await page.fill('#transfer-description', 'Prueba Playwright 001');

  // =============================
  // 7️⃣ CLICK TRANSFERIR
  // =============================

  await page.locator('#transfer-form button').click();

  // =============================
  // 8️⃣ CONFIRMAR POPUP
  // =============================

  await page.locator('#modal-confirm').click();

  // =============================
  // 9️⃣ VALIDAR MENSAJE DE ÉXITO
  // =============================

  await expect(
    page.getByText('Transferencia realizada exitosamente')
  ).toBeVisible();
});
