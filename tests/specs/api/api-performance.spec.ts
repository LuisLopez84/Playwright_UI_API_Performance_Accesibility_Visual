import { test, expect } from '@playwright/test';

test('API - dashboard performance', async ({ request }) => {

  const start = Date.now();

  const response = await request.get('/cliente/dashboard');

  const duration = Date.now() - start;

  expect(response.status()).toBe(200);
  expect(duration).toBeLessThan(5000);

});
