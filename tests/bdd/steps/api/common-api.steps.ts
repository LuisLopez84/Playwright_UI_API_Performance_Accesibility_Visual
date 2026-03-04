import { Given, When, Then, expect } from '../../../fixtures/world';

Given('la API está disponible', async () => {
  // opcional: healthcheck real
});

When('consulto el endpoint {string}', async ({ request, apiContext }, endpoint) => {

  const start = Date.now();

  const response = await request.get(endpoint, {
    headers: { accept: 'application/json' }
  });

  const duration = Date.now() - start;
  const body = await response.json();

  apiContext.response = response;
  apiContext.duration = duration;
  apiContext.body = body;
});

Then('el código de respuesta debe ser {int}', async ({ apiContext }, status) => {
  expect(apiContext.response?.status()).toBe(status);
});

Then('el tiempo de respuesta debe ser menor a {string} ms', async ({ apiContext }, sla) => {
  expect(apiContext.duration).toBeLessThan(Number(sla));
});

Then('el header {string} debe contener {string}', async ({ apiContext }, header, value) => {
  expect(apiContext.response?.headers()[header]).toContain(value);
});