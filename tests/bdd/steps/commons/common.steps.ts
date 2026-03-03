import { Given, expect } from '../../../fixtures/world';

Given('el usuario autenticado', async ({ page }) => {
  await page.goto('/');
  await page.fill('#username', 'demo');
  await page.fill('#password', 'demo123');
  await page.click('#login-btn');
});