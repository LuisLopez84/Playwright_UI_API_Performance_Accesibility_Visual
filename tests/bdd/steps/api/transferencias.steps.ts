import { Given, When, Then, expect } from '../../../fixtures/world';

Given('la API de transferencias está disponible', async () => {
  // opcional healthcheck
});

When(
  'envío una solicitud de transferencia desde {string} hacia {string} por {string}',
  async ({ request, apiContext }, origen, destino, monto) => {

    const start = Date.now();

    const response = await request.post('/transferencias', {
      data: {
        fromAccount: origen,
        toAccount: destino,
        amount: Number(monto)
      }
    });

    const duration = Date.now() - start;
    const body = await response.json();

    apiContext.response = response;
    apiContext.body = body;
    apiContext.duration = duration;
  }
);