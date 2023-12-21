### Tests in TS+Playwright

#### How to run
##### Locally

    npx playwright install
    npm install -D @playwright/test typescript
    npm test

##### In container

    docker build -t tests-image .
    docker run test-image


##### [JB aqua](https://www.jetbrains.com/aqua/) debug configuration:
![](IDE_config.png)