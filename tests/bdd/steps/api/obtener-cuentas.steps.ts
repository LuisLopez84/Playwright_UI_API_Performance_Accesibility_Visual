import { Then, expect } from '../../../fixtures/world';

Then('la respuesta debe contener cuentas válidas', async () => {
  expect(body.success).toBe(true);
  expect(Array.isArray(body.accounts)).toBe(true);
  expect(body.accounts[0].currency).toBe('ARS');
});