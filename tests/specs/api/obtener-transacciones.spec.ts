import { test, expect } from '@playwright/test';

test('GET /transacciones - Contract + Business + SLA validation', async ({ request }) => {

  const start = Date.now();

  const response = await request.get('/transacciones/?limit=10', {
    headers: { accept: 'application/json' }
  });

  const duration = Date.now() - start;

  // 1️⃣ STATUS
  expect(response.status()).toBe(200);

  // 2️⃣ HEADER
  expect(response.headers()['content-type'])
    .toContain('application/json');

  // 3️⃣ SLA (realista para entorno demo)
  expect(duration).toBeLessThan(5000);

  const body = await response.json();
    await test.info().attach('response-body', {
      body: JSON.stringify(body, null, 2),
      contentType: 'application/json'
});

  // 4️⃣ CONTRACT
  expect(body).toHaveProperty('success');
  expect(body).toHaveProperty('transactions');

  expect(body.success).toBe(true);
  expect(Array.isArray(body.transactions)).toBe(true);
  expect(body.transactions.length).toBeLessThanOrEqual(10);

  // 5️⃣ STRUCTURE
  const transaction = body.transactions[0];

  expect(transaction).toHaveProperty('id');
  expect(transaction).toHaveProperty('date');
  expect(transaction).toHaveProperty('description');
  expect(transaction).toHaveProperty('amount');
  expect(transaction).toHaveProperty('type');
  expect(transaction).toHaveProperty('account');

  // 6️⃣ TYPE VALIDATION
  expect(typeof transaction.id).toBe('string');
  expect(typeof transaction.date).toBe('string');
  expect(typeof transaction.description).toBe('string');
  expect(typeof transaction.amount).toBe('number');
  expect(['credit', 'debit']).toContain(transaction.type);

  // 7️⃣ BUSINESS RULES
  if (transaction.type === 'credit') {
    expect(transaction.amount).toBeGreaterThan(0);
  }

  if (transaction.type === 'debit') {
    expect(transaction.amount).toBeLessThan(0);
  }

});
