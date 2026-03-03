import { test as base } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

type ApiContext = {
response?: any;
body?: any;
duration?: number;
};

export const test = base.extend<{ apiContext: ApiContext }>({
apiContext: async ({}, use) => {
    await use({});
  }
});

export const { Given, When, Then, Before, After } = createBdd(test);
export { expect };