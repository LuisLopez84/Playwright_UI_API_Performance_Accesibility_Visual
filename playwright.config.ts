import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const bddTestDir = defineBddConfig({
features: 'tests/bdd/features/**/*.feature',
steps: [
'tests/bdd/steps/**/*.ts',
'tests/fixtures/world.ts'
]
});

export default defineConfig({

  outputDir: 'test-results',

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],

  fullyParallel: true,
  retries: 1,

  // TIMEOUT GLOBAL
  timeout: 60000, // 60 segundos por test

  expect: {
    timeout: 10000 // 10 segundos por validación (Then)
  },

  projects: [

    // =========================
    // SPECS E2E
    // =========================
    {
      name: 'specs-e2e',
      testDir: 'tests/specs/e2e',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://homebanking-demo-tests.netlify.app',
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'on'
      }
    },

    // =========================
    // SPECS API
    // =========================
    {
      name: 'specs-api',
      testDir: 'tests/specs/api',
      use: {
        baseURL: 'https://homebanking-demo.onrender.com'
      }
    },

    // =========================
    // BDD UI
    // =========================
    {
      name: 'bdd-ui',
      testDir: bddTestDir,
      grep: /@UI/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://homebanking-demo-tests.netlify.app',
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'on'
      }
    },

    // =========================
    // BDD API
    // =========================
    {
      name: 'bdd-api',
      testDir: bddTestDir,
      grep: /@API/,
      use: {
        baseURL: 'https://homebanking-demo.onrender.com'
      }
    }
  ]
});