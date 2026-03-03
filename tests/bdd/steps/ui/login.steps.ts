import { Given, When, Then, expect } from '../../../fixtures/world';

Given('el usuario navega al login', async ({ page }) => {
  await page.goto('/');
});

When('ingresa usuario {string} y contraseña {string}', async ({ page }, user, pass) => {
  await page.fill('#username', user);
  await page.fill('#password', pass);
  await page.click('#login-btn');
});

Then('debe visualizar el dashboard principal', async ({ page }) => {
await expect(page.locator('xpath=//*[@id="app-view"]/nav/div[1]/span')).toBeVisible();
});
