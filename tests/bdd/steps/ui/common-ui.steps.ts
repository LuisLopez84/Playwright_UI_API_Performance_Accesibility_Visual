import { Given, expect } from '../../../fixtures/world';

Given('el usuario autenticado en el sistema', async ({ page }) => {

  // Esperar carga inicial
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  // Esperar inputs visibles
  await expect(page.locator('#username')).toBeVisible();
  await expect(page.locator('#password')).toBeVisible();

  // Llenar credenciales
  await page.fill('#username', 'demo');
  await page.fill('#password', 'demo123');

  // Esperar botón habilitado
  const loginBtn = page.locator('#login-btn');
  await expect(loginBtn).toBeEnabled();

  // Click con espera de navegación
  await Promise.all([
    page.waitForLoadState('networkidle'),
    loginBtn.click()
  ]);

  // Validar dashboard cargado
  await expect(page.locator('#app-view')).toBeVisible({ timeout: 10000 });
});