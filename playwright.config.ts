import { defineConfig, devices } from '@playwright/test'; // Import necessary configuration utilities and device definitions from Playwright

export default defineConfig({
  testDir: './tests', // Specifies the directory where Playwright should look for test files
  fullyParallel: true, // Enables parallel execution of test files for faster test runs
  forbidOnly: !!process.env.CI, // Prevents accidentally committing test.only() when running in CI/CD pipelines
  retries: process.env.CI ? 2 : 0, // Automatically retries failed tests twice in CI to combat flakiness, zero retries locally
  workers: process.env.CI ? 1 : undefined, // Restricts execution to 1 worker on CI to save server resources, uses max available locally
  reporter: 'html', // Generates a visual HTML test execution report after tests complete
  
  // Global settings applied to all browser contexts and tests
  use: {
    baseURL: 'https://www.saucedemo.com', // Defines the root app URL so tests can use relative paths like await page.goto('/')
    trace: 'on-first-retry', // Captures detailed debugging traces only when a test fails and is retried
    screenshot: 'only-on-failure', // Automatically takes a screenshot if a test fails
    video: 'retain-on-failure', // Records video of the session and saves it only if a test fails
    actionTimeout: 15000, // Sets a 15-second timeout for individual actions (clicks/fills) to prevent infinite hanging
  },

  // Defines the browser environments and projects to test against
  projects: [
    {
      name: 'chromium', // Project label for Google Chrome / Chromium-based browsers
      use: { ...devices['Desktop Chrome'] }, // Inherits standard desktop Chrome device parameters and viewport settings
    },
  ],
});