import { test, expect } from '@playwright/test';

test('GET Cliente Dashboard - Contract + Business + SLA validation', async ({ request }) => {

  const start = Date.now();

  const response = await request.get('/cliente/dashboard', {
    headers: {
      accept: 'application/json'
    }
  });

  const duration = Date.now() - start;

  // 1️⃣ STATUS
  expect(response.status()).toBe(200);

  // 2️⃣ HEADERS
  expect(response.headers()['content-type'])
    .toContain('application/json');

  const body = await response.json();

  await test.info().attach('response-body', {
    body: JSON.stringify(body, null, 2),
    contentType: 'application/json'
  });

  await test.info().attach('response-time', {
    body: `Response time: ${duration} ms`,
    contentType: 'text/plain'
  });

  // 3️⃣ SLA
  expect(duration).toBeLessThan(5000);

  // 4️⃣ CONTRACT ROOT
  expect(body).toHaveProperty('success');
  expect(body).toHaveProperty('data');

  expect(body.success).toBe(true);

  // =============================
  // DATA OBJECT VALIDATION
  // =============================
  const data = body.data;

  expect(data).toHaveProperty('personalInfo');
  expect(data).toHaveProperty('accounts');
  expect(data).toHaveProperty('cards');

  // =============================
  // PERSONAL INFO VALIDATION
  // =============================
  const personal = data.personalInfo;

  expect(personal).toHaveProperty('name');
  expect(personal).toHaveProperty('dni');
  expect(personal).toHaveProperty('email');
  expect(personal).toHaveProperty('phone');
  expect(personal).toHaveProperty('address');

  expect(typeof personal.name).toBe('string');
  expect(typeof personal.dni).toBe('string');
  expect(typeof personal.email).toBe('string');

  // =============================
  // ACCOUNTS VALIDATION
  // =============================
  expect(Array.isArray(data.accounts)).toBe(true);
  expect(data.accounts.length).toBeGreaterThan(0);

  const account = data.accounts[0];

  expect(account).toHaveProperty('id');
  expect(account).toHaveProperty('number');
  expect(account).toHaveProperty('balance');
  expect(account).toHaveProperty('currency');

  expect(account.currency).toBe('ARS');
  expect(account.balance).toBeGreaterThanOrEqual(0);

});
