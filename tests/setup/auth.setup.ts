import { test as setup } from '@playwright/test';

setup('authenticate', async ({ page }) => {

  await page.goto('/');

  await page.fill('#username', 'demo');
  await page.fill('#password', 'demo123');
  await page.click('#login-btn');

  await page.waitForSelector('#app-view', { state: 'visible' });

  await page.context().storageState({
    path: 'storage/auth.json'
  });

});
