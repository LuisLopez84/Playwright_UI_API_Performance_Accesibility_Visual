import { Then, expect } from '../../../fixtures/world';

Then('el tiempo de respuesta promedio debe ser menor a {int} ms', async ({}, sla) => {
  expect(avgDuration).toBeLessThan(sla);
});
