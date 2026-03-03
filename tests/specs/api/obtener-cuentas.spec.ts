import { test, expect } from '@playwright/test';

test('GET /cuentas - Contract + Business + SLA validation', async ({ request }) => {

  const start = Date.now();

  const response = await request.get('/cuentas/', {
    headers: {
      accept: 'application/json'
    }
  });

  const duration = Date.now() - start;

  // =============================
  // 1️⃣ STATUS VALIDATION
  // =============================
  expect(response.status()).toBe(200);

  // =============================
  // 2️⃣ HEADER VALIDATION
  // =============================
  expect(response.headers()['content-type'])
    .toContain('application/json');

  // =============================
  // 3️⃣ SLA VALIDATION
  // =============================
  expect(duration).toBeLessThan(5000);

  const body = await response.json();
    await test.info().attach('response-body', {
      body: JSON.stringify(body, null, 2),
      contentType: 'application/json'
});

  // =============================
  // 4️⃣ CONTRACT VALIDATION
  // =============================
  expect(body).toHaveProperty('success');
  expect(body).toHaveProperty('accounts');

  expect(body.success).toBe(true);
  expect(Array.isArray(body.accounts)).toBe(true);
  expect(body.accounts.length).toBeGreaterThan(0);

  // =============================
  // 5️⃣ STRUCTURE VALIDATION
  // =============================
  const account = body.accounts[0];

  expect(account).toHaveProperty('id');
  expect(account).toHaveProperty('type');
  expect(account).toHaveProperty('number');
  expect(account).toHaveProperty('displayNumber');
  expect(account).toHaveProperty('balance');
  expect(account).toHaveProperty('currency');

  // =============================
  // 6️⃣ TYPE VALIDATION
  // =============================
  expect(typeof account.id).toBe('string');
  expect(typeof account.type).toBe('string');
  expect(typeof account.number).toBe('string');
  expect(typeof account.displayNumber).toBe('string');
  expect(typeof account.balance).toBe('number');
  expect(typeof account.currency).toBe('string');

  // =============================
  // 7️⃣ BUSINESS RULE VALIDATION
  // =============================
  expect(account.currency).toBe('ARS');
  expect(account.number.length).toBe(16);
  expect(account.balance).toBeGreaterThanOrEqual(0);

});
