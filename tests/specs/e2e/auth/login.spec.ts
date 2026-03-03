import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';

test.describe('Banking Login Flow', () => {

  test('complete login flow @smoke @critical', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await page.locator('xpath=//*[@id="username"]').fill('demo');
    await page.locator('xpath=//*[@id="password"]').fill('demo123');
    await page.locator('xpath=//*[@id="login-btn"]/span[1]').click();

    await page.waitForSelector('xpath=//*[@id="app-view"]/nav/div[1]/span');
    await expect(page.locator('xpath=//*[@id="app-view"]/nav/div[1]/span')).toBeVisible();
  });

});
