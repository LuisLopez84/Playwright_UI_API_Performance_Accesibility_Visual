import { When, Then, expect } from '../../../fixtures/world';

When(
  'envío un pago con monto {string} y cuenta {string}',
  async ({ request, apiContext }, monto, cuenta) => {

    const start = Date.now();

    const response = await request.post('/pagos/servicios', {
      data: {
        id_cuenta: cuenta,
        id_servicio: 'SRV001',
        monto: Number(monto)
      }
    });

    const duration = Date.now() - start;
    const body = await response.json();

    apiContext.response = response;
    apiContext.body = body;
    apiContext.duration = duration;
  }
);

Then('la respuesta debe indicar pago exitoso', async ({ apiContext }) => {
  expect(apiContext.body.success).toBe(true);
});