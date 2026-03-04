import { Then, expect } from '../../../fixtures/world';

Then(
  'la respuesta debe contener cuentas válidas',
  async ({ apiContext }) => {

    const body = apiContext.body;

    // =============================
    // 1️⃣ CONTRACT VALIDATION
    // =============================

    expect(body).toHaveProperty('success');
    expect(body).toHaveProperty('accounts');

    expect(body.success).toBe(true);
    expect(Array.isArray(body.accounts)).toBe(true);
    expect(body.accounts.length).toBeGreaterThan(0);

    // =============================
    // 2️⃣ VALIDACIÓN COMPLETA DE LISTA
    // =============================

    body.accounts.forEach((account: any) => {

      // ---------- Campos obligatorios ----------
      expect(account).toHaveProperty('id');
      expect(account).toHaveProperty('type');
      expect(account).toHaveProperty('number');
      expect(account).toHaveProperty('displayNumber');
      expect(account).toHaveProperty('balance');
      expect(account).toHaveProperty('currency');

      // ---------- Tipos ----------
      expect(typeof account.id).toBe('string');
      expect(typeof account.type).toBe('string');
      expect(typeof account.number).toBe('string');
      expect(typeof account.displayNumber).toBe('string');
      expect(typeof account.balance).toBe('number');
      expect(typeof account.currency).toBe('string');

      // =============================
      // 3️⃣ REGLAS DE NEGOCIO
      // =============================

      // ID debe comenzar con ACC
      expect(account.id.startsWith('ACC')).toBeTruthy();

      // Moneda debe ser ARS
      expect(account.currency).toBe('ARS');

      // Balance no debe ser negativo
      expect(account.balance).toBeGreaterThanOrEqual(0);

      // displayNumber debe estar enmascarado
      expect(account.displayNumber).toMatch(/\*\*\*\*/);

      // =============================
      // 4️⃣ VALIDACIONES POR TIPO
      // =============================

      if (account.type === 'Tarjeta de Crédito') {
        expect(account).toHaveProperty('limit');
        expect(typeof account.limit).toBe('number');
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
  }
);