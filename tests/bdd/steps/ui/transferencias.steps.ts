import { When, Then, expect } from '../../../fixtures/world';

When(
  'navega al modulo Transferencias', async ({ page }) => {
    const transferMenu = page.locator(
    '#app-view aside ul li span',
    { hasText: 'Transferencias' }
  );

  await expect(transferMenu).toBeVisible();
  await transferMenu.click();

await expect(page.locator('#transfer-type')).toBeVisible();
  }
);

When(
  'selecciono entre Mis Cuentas', async ({ page }) => {
    await page.locator('#transfer-type')
  .selectOption({ label: 'Entre mis cuentas' });
  }
);

When(
  'seleciono cuenta origen {string}',
  async ({ page }, origen) => {

    await expect(page.locator('#source-account')).toBeVisible();

    await page.locator('#source-account')
      .selectOption(origen);
  }
);

When(
  'seleciono cuenta Destino {string}',
  async ({ page }, destino) => {

    await expect(page.locator('#destination-own-account')).toBeVisible();

    await page.locator('#destination-own-account')
      .selectOption(destino);
  }
);

When(
  'seleciono cuenta Destino {string}',
  async ({ page }, destino) => {
    await page.locator('#destination-own-account')
      .selectOption({ label: destino });
  }
);

When(
  'agrego monto {string} descripción {string}',
  async ({ page }, monto, descripción) => {
    await page.fill('#transfer-amount', monto);
    await page.fill('#transfer-description', descripción);
  }
);

When(
  'doy clic en el boton Transferir', async ({ page }) => {
    await page.locator('#transfer-form button').click();
  }
);

When(
  'confirmo Popup', async ({ page }) => {
    await page.locator('#modal-confirm').click();
  }
);

Then('debe visualizar confirmación de transferencia', async ({ page }) => {
  await expect(
    page.getByText('Transferencia realizada exitosamente')
  ).toBeVisible();
});