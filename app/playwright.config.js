import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'app',
  testMatch: '*.e2e.ts',

  webServer: {
    command: 'yarn run start',
    url: 'http://localhost:19000/',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    stdout: 'pipe',
    stderr: 'pipe',
  },

  // Run all tests in parallel.
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only.
  retries: process.env.CI ? 1 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,

  outputDir: './playwright/test-results',

  // Reporter to use
  reporter: [
    // For GitHub Actions CI to generate annotations
    ['github'],
    ['html', { outputFolder: './playwright/test-report' }],
  ],

  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: 'http://localhost:19000',
    // Collect trace when retrying the failed test.
    trace: 'on',
    // equivalent to cypress: macbook-16
    viewport: { width: 1200, height: 1200 },
    video: 'on',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
