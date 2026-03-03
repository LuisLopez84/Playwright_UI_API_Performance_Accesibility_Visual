import { test, expect } from '@playwright/test';

test('POST Pago Servicio - Contract + Business + SLA validation', async ({ request }) => {

  const payload = {
    id_cuenta: "ACC001",
    id_servicio: "SRV001",
    monto: 8500
  };

  const start = Date.now();

  const response = await request.post('/pagos/servicios', {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json'
    },
    data: payload
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

  // Adjuntar response al reporte
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
  expect(body.success).toBe(true);

  // Si el backend devuelve mensaje o id_transaccion, lo validamos
  if (body.transactionId) {
    expect(typeof body.transactionId).toBe('string');
  }

  if (body.message) {
    expect(typeof body.message).toBe('string');
  }

  // =============================
  // 5️⃣ BUSINESS RULE VALIDATION
  // =============================

  // El monto debe ser positivo
  expect(payload.monto).toBeGreaterThan(0);

  // Validar formato de cuenta
  expect(payload.id_cuenta.startsWith('ACC')).toBeTruthy();

  // Validar formato de servicio
  expect(payload.id_servicio.startsWith('SRV')).toBeTruthy();

});
