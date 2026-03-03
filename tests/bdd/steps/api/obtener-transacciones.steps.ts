import { Then, expect } from '../../../fixtures/world';

Then('la respuesta debe contener transacciones válidas', async () => {
  expect(body.success).toBe(true);
  expect(Array.isArray(body.transactions)).toBe(true);
  expect(body.transactions[0]).toHaveProperty('amount');
});