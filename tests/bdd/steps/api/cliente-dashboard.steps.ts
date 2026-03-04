import { Given, When, Then, expect } from '../../../fixtures/world';

Given('la API del dashboard está disponible', async () => {
});

Then(
  'la estructura del dashboard debe ser válida',
  async ({ apiContext }) => {

    const body = apiContext.body;

    // =============================
    // 1️⃣ VALIDACIÓN CONTRACT
    // =============================

    expect(body).toHaveProperty('success');
    expect(body).toHaveProperty('data');
    expect(body.success).toBe(true);

    const data = body.data;

    expect(data).toHaveProperty('personalInfo');
    expect(data).toHaveProperty('accounts');
    expect(data).toHaveProperty('cards');

    expect(Array.isArray(data.accounts)).toBe(true);
    expect(Array.isArray(data.cards)).toBe(true);

    // =============================
    // 2️⃣ VALIDACIÓN PERSONAL INFO
    // =============================

    const personal = data.personalInfo;

    expect(personal).toHaveProperty('name');
    expect(personal).toHaveProperty('dni');
    expect(personal).toHaveProperty('email');
    expect(personal).toHaveProperty('phone');
    expect(personal).toHaveProperty('address');

    expect(typeof personal.name).toBe('string');
    expect(personal.email).toContain('@');
    expect(personal.dni).toMatch(/\d/);

    // =============================
    // 3️⃣ VALIDACIÓN DE CUENTAS
    // =============================

    data.accounts.forEach((account: any) => {

      expect(account.id.startsWith('ACC')).toBeTruthy();
      expect(account.currency).toBe('ARS');
      expect(account.balance).toBeGreaterThanOrEqual(0);

      if (account.type === 'Tarjeta de Crédito') {
        expect(account).toHaveProperty('limit');
        expect(account.limit).toBeGreaterThan(account.balance);
      }

      if (
        account.type === 'Cuenta Corriente' ||
        account.type === 'Caja de Ahorro'
      ) {
        expect(account).toHaveProperty('cbu');
        expect(account.cbu.length).toBe(22);
      }
    });

    // =============================
    // 4️⃣ VALIDACIÓN DE TARJETAS
    // =============================

    data.cards.forEach((card: any) => {

      expect(card.id.startsWith('CARD')).toBeTruthy();
      expect(['Visa', 'Mastercard']).toContain(card.brand);
      expect(card.displayNumber).toMatch(/\*\*\*\*/);

      if (card.type === 'Crédito') {
        expect(card).toHaveProperty('limit');
        expect(card).toHaveProperty('available');
        expect(card.available).toBeLessThanOrEqual(card.limit);
      }

      if (card.type === 'Débito') {
        expect(card).toHaveProperty('linkedAccount');
        expect(card.linkedAccount.startsWith('ACC')).toBeTruthy();
      }
    });
  }
);