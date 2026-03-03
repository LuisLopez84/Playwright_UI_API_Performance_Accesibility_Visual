import { test, expect } from '@playwright/test';

test('Core Web Vitals', async ({ page }) => {

  await page.goto('/');

  const metrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0];
    return {
      loadTime: navigation.loadEventEnd - navigation.fetchStart
    };
  });

  expect(metrics.loadTime).toBeLessThan(3000);

});

test('Resource Performance', async ({ page }) => {

  await page.goto('/');

  const resources = await page.evaluate(() =>
    performance.getEntriesByType('resource')
  );

  const slow = resources.filter((r: any) => r.duration > 1000);

  expect(slow.length).toBe(0);
});

test('Performance Budget', async ({ page }) => {

  await page.goto('/');

  const metrics = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    return {
      pageLoad: nav.loadEventEnd - nav.fetchStart
    };
  });

  const budget = 3000;
  expect(metrics.pageLoad).toBeLessThan(budget);

});

