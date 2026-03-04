import { When, Then, expect } from '../../../fixtures/world';

Then(
  'la respuesta debe contener transacciones válidas',
  async ({ apiContext }) => {

    const body = apiContext.body;

    // =============================
    // 1️⃣ CONTRACT VALIDATION
    // =============================

    expect(body).toHaveProperty('success');
    expect(body).toHaveProperty('transactions');

    expect(body.success).toBe(true);
    expect(Array.isArray(body.transactions)).toBe(true);
    expect(body.transactions.length).toBeGreaterThan(0);

    // =============================
    // 2️⃣ STRUCTURE VALIDATION
    // =============================

    const transaction = body.transactions[0];

    expect(transaction).toHaveProperty('id');
    expect(transaction).toHaveProperty('date');
    expect(transaction).toHaveProperty('description');
    expect(transaction).toHaveProperty('amount');
    expect(transaction).toHaveProperty('type');
    expect(transaction).toHaveProperty('account');

    // =============================
    // 3️⃣ TYPE VALIDATION
    // =============================

    expect(typeof transaction.id).toBe('string');
    expect(typeof transaction.date).toBe('string');
    expect(typeof transaction.description).toBe('string');
    expect(typeof transaction.amount).toBe('number');
    expect(typeof transaction.type).toBe('string');
    expect(typeof transaction.account).toBe('string');

    // =============================
    // 4️⃣ BUSINESS RULE VALIDATION
    // =============================

    expect(['credit', 'debit']).toContain(transaction.type);

    if (transaction.type === 'debit') {
      expect(transaction.amount).toBeLessThan(0);
    }

    if (transaction.type === 'credit') {
      expect(transaction.amount).toBeGreaterThan(0);
    }

    expect(transaction.id.startsWith('TXN')).toBeTruthy();
  }
);