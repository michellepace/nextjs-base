import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

const PORT = process.env.PORT || 3000;
/* BASE_URL is set when testing a Vercel preview deployment */
const baseURL = process.env.BASE_URL || `http://localhost:${PORT}`;

/* All Playwright outputs nested under .playwright/ */
const TEST_RESULTS = ".playwright/test-results";
const HTML_REPORT = ".playwright/playwright-report";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./e2e",
  outputDir: TEST_RESULTS,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  /* open: "never" so the terminal isn't blocked; view with `npm run test:e2e:report` */
  reporter: process.env.CI
    ? [["html", { outputFolder: HTML_REPORT, open: "never" }], ["github"]]
    : [["html", { outputFolder: HTML_REPORT, open: "never" }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    screenshot: "only-on-failure",

    /* Bypass Vercel Deployment Protection on preview deployments (secret set in CI).
     * See https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation */
    ...(process.env.VERCEL_AUTOMATION_BYPASS_SECRET && {
      extraHTTPHeaders: {
        "x-vercel-protection-bypass":
          process.env.VERCEL_AUTOMATION_BYPASS_SECRET,
        "x-vercel-set-bypass-cookie": "true",
      },
    }),
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },

    /* Off: Mobile Safari below already covers the WebKit engine */
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  /* Prod build on CI; skipped when BASE_URL points at an external deployment */
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: process.env.CI ? "npm start" : "npm run dev",
        url: baseURL,
        reuseExistingServer: !process.env.CI,
      },
});
