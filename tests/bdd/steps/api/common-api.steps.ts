import { Given, When, Then, expect } from '../../../fixtures/world';
import { test } from '@playwright/test';

Given('la API está disponible', async () => {
  // opcional: healthcheck
});

async function attachJson(name: string, data: any) {
  await test.info().attach(name, {
    body: JSON.stringify(data, null, 2),
    contentType: 'application/json'
  });
}

When(
  'consulto el endpoint {string}',
  async ({ request, apiContext }, endpoint) => {

    const start = Date.now();

    const response = await request.get(endpoint, {
      headers: { accept: 'application/json' }
    });

    const duration = Date.now() - start;
    const body = await response.json();

    apiContext.response = response;
    apiContext.duration = duration;
    apiContext.body = body;

    // ✅ Attach correcto
    await attachJson(`Response - ${endpoint}`, body);

    await attachJson(`Metadata - ${endpoint}`, {
      status: response.status(),
      duration,
      headers: response.headers()
    });
  }
);

// ✅ Ahora los Then están fuera del When

Then(
  'el código de respuesta debe ser {int}',
  async ({ apiContext }, status: number) => {
    expect(apiContext.response?.status()).toBe(status);
  }
);

Then(
  'el tiempo de respuesta debe ser menor a {string} ms',
  async ({ apiContext }, sla: string) => {
    expect(apiContext.duration).toBeLessThan(Number(sla));
  }
);

Then(
  'el header {string} debe contener {string}',
  async ({ apiContext }, header: string, value: string) => {
    const headers = apiContext.response?.headers();
    expect(headers?.[header.toLowerCase()]).toContain(value);
  }
);