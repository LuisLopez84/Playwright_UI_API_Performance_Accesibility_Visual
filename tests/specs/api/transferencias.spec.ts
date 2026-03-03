import { test, expect } from '@playwright/test';

test('POST Transacciones - Contract + Business + SLA validation', async ({ request }) => {

  const start = Date.now();

  const response = await request.get('/transacciones/?limit=10', {
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

  const body = await response.json();

  // Attach response to report
  await test.info().attach('response-body', {
    body: JSON.stringify(body, null, 2),
    contentType: 'application/json'
  });

  await test.info().attach('response-time', {
    body: `Response time: ${duration} ms`,
    contentType: 'text/plain'
  });

  // =============================
  // 3️⃣ SLA VALIDATION
  // =============================
  expect(duration).toBeLessThan(5000);

  // =============================
  // 4️⃣ CONTRACT VALIDATION
  // =============================
  expect(body).toHaveProperty('success');
  expect(body).toHaveProperty('transactions');

  expect(body.success).toBe(true);
  expect(Array.isArray(body.transactions)).toBe(true);
  expect(body.transactions.length).toBeGreaterThan(0);

  // =============================
  // 5️⃣ STRUCTURE VALIDATION
  // =============================
  const transaction = body.transactions[0];

  expect(transaction).toHaveProperty('id');
  expect(transaction).toHaveProperty('date');
  expect(transaction).toHaveProperty('description');
  expect(transaction).toHaveProperty('amount');
  expect(transaction).toHaveProperty('type');
  expect(transaction).toHaveProperty('account');

  // =============================
  // 6️⃣ TYPE VALIDATION
  // =============================
  expect(typeof transaction.id).toBe('string');
  expect(typeof transaction.date).toBe('string');
  expect(typeof transaction.description).toBe('string');
  expect(typeof transaction.amount).toBe('number');
  expect(typeof transaction.type).toBe('string');
  expect(typeof transaction.account).toBe('string');

  // =============================
  // 7️⃣ BUSINESS RULE VALIDATION
  // =============================

  // Tipo permitido
  expect(['credit', 'debit']).toContain(transaction.type);

  // Si es debit → monto negativo
  if (transaction.type === 'debit') {
    expect(transaction.amount).toBeLessThan(0);
  }

  // Si es credit → monto positivo
  if (transaction.type === 'credit') {
    expect(transaction.amount).toBeGreaterThan(0);
  }

  // Validar que el ID comience con TXN
  expect(transaction.id.startsWith('TXN')).toBeTruthy();

});
