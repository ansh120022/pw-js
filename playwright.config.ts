import { type PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  use: {
    baseURL: 'https://demo.ft-crm.com/',
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    testMatch: 'src/tests/*.test.ts'
  },
  reporter: 'html'
}

export default config
