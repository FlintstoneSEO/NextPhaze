import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  use: {
    baseURL: process.env.PREVIEW_URL || 'http://127.0.0.1:4322',
    browserName: 'chromium',
    launchOptions: {
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    },
    trace: 'retain-on-failure'
  },
  reporter: [['list']]
});
