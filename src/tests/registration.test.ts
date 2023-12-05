import { test, expect } from '@playwright/test'
import { AccountPage } from '../pages/registration'
import faker from 'faker'

test('Registration test', async ({ page }) => {
  const account = new AccountPage(page)
  const email = faker.internet.email()
  const password = 'BLAHblahBLAH'
  await account.navigateStartPage()
  await account.signUp(email, password)
  const balanceButton = page.getByText('Login')
  await balanceButton.click()
  await account.signIn(email)
  await expect(balanceButton).toBeVisible()
})
