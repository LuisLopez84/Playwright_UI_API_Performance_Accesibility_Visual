import { Page, Locator } from '@playwright/test';

export class LoginPage {

  readonly page: Page;
  readonly accountInput: Locator;
  readonly pinInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountInput = page.getByLabel('Account Number');
    this.pinInput = page.getByLabel('PIN');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(account: string, pin: string) {
    await this.accountInput.fill(account);
    await this.pinInput.fill(pin);
    await this.loginButton.click();
  }
}
