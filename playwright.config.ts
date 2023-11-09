import { PlaywrightTestConfig } from '@playwright/test';


const config: PlaywrightTestConfig = {
    use: {
        baseURL: "https://demo.ft-crm.com/",
        browserName: 'chromium',
        headless: false,
        screenshot: 'only-on-failure',
        testMatch: 'src/tests/*.test.ts'
    },
    reporter: 'html',
};

export default config;