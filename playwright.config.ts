import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import { config as env } from './tests/config/environment';

// =========================
// BDD CONFIG
// =========================
const bddTestDir = defineBddConfig({
features: 'tests/bdd/features/**/*.feature',
steps: [
'tests/bdd/steps/**/*.ts',
'tests/fixtures/world.ts'
]
});

export default defineConfig({

  outputDir: 'test-results',

use: {
    trace: 'on',
    screenshot: 'on',
    video: 'on'
  },

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
  // BDD UI - CHROMIUM
  // =========================
  {
    name: 'bdd-ui-chromium',
    testDir: bddTestDir,
    grep: /@UI/,
    use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://homebanking-demo-tests.netlify.app'
      }
    },

// =========================
  // BDD UI - FIREFOX
  // =========================
  {
    name: 'bdd-ui-firefox',
    testDir: bddTestDir,
    grep: /@UI/,
    use: {
      ...devices['Desktop Firefox'],
      browserName: 'firefox',
      baseURL: 'https://homebanking-demo-tests.netlify.app'
    }
  },

  // =========================
  // BDD UI - WEBKIT (Safari)
  // =========================
  {
    name: 'bdd-ui-webkit',
    testDir: bddTestDir,
    grep: /@UI/,
    use: {
      ...devices['Desktop Safari'],
      browserName: 'webkit',
      baseURL: 'https://homebanking-demo-tests.netlify.app'
    }
  },

  // =========================
  // BDD API (solo @API)
  // =========================
  {
    name: 'bdd-api',
    testDir: bddTestDir,
    grep: /@API/,
    use: {
      baseURL: env.apiBaseUrl
    }
  },

  // =========================
  // PERFORMANCE
  // =========================
  {
    name: 'performance',
    testMatch: 'tests/performance/**/*.spec.ts',
    use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://homebanking-demo-tests.netlify.app'
    }
  },

  // =========================
  // VISUAL
  // =========================
  {
    name: 'visual',
    testMatch: 'tests/visual/home.visual.spec.ts',
    use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://homebanking-demo-tests.netlify.app'
    }
  },

  // =========================
  // ACCESSIBILITY
  // =========================
  {
    name: 'accessibility',
    testMatch: 'tests/visual/accessibility.spec.ts',
    use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://homebanking-demo-tests.netlify.app'
    }
  }
]
});