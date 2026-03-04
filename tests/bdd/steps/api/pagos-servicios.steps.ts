import { When, Then, expect } from '../../../fixtures/world';

When(
  'envío un pago con monto {string} y cuenta {string}',
  async ({ request, apiContext }, monto, cuenta) => {

    const start = Date.now();

    const response = await request.post('/pagos/servicios', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
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

  const body = apiContext.body;

  // Status lógico
  expect(body.exito).toBe(true);
  expect(body.error).toBeNull();

  // Contract validation
  expect(body).toHaveProperty('mensaje');
  expect(body).toHaveProperty('comprobante');

  // Structure validation
  const comprobante = body.comprobante;

  expect(comprobante).toHaveProperty('id');
  expect(comprobante).toHaveProperty('servicio');
  expect(comprobante).toHaveProperty('empresa');
  expect(comprobante).toHaveProperty('monto');
  expect(comprobante).toHaveProperty('fecha');
  expect(comprobante).toHaveProperty('cuenta');

  // Type validation
  expect(typeof comprobante.id).toBe('string');
  expect(typeof comprobante.monto).toBe('number');

});