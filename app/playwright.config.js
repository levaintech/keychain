import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'app',
  testMatch: '*.e2e.ts',

  webServer: {
    command: 'yarn run start',
    // http://localhost:8081/ isn't reliable to determine if the server is ready.
    // However, AppEntry.bundle will only be available after the "Web Bundling complete" message.
    url: 'http://localhost:8081/AppEntry.bundle?platform=web&hot=false',
    reuseExistingServer: !process.env.CI,
    timeout: 180 * 1000,
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
    baseURL: 'http://localhost:8081',
    // Collect trace when retrying the failed test.
    trace: 'on',
    viewport: { width: 500, height: 900 },
    video: 'on',
  },
});
