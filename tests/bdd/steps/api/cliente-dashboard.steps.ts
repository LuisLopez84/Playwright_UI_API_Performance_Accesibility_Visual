import { Given, When, Then, expect } from '../../../fixtures/world';

Given('la API del dashboard está disponible', async () => {
  // opcional healthcheck
});

When('consulto el dashboard del cliente', async ({ request, apiContext }) => {
  const start = Date.now();

  const response = await request.get('/dashboard');
  const duration = Date.now() - start;
  const body = await response.json();

  apiContext.response = response;
  apiContext.body = body;
  apiContext.duration = duration;
});

Then('el dashboard debe contener información válida', async ({ apiContext }) => {
  expect(apiContext.body).toBeDefined();
  expect(apiContext.body.cliente).toBeDefined();
});

Then('la estructura del dashboard debe ser válida', async ({ apiContext }) => {
  expect(apiContext.body).toHaveProperty('cliente');
  expect(apiContext.body).toHaveProperty('cuentas');
});