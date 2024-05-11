import { test, expect } from '@playwright/test';

test('BitAlliance in google search results', async ({ page }) => {
  await page.goto('https://www.google.com/?hl=en');

  await expect(page).toHaveTitle(/Google/);

  await page.getByTitle('Search').fill('Bit Alliance');

  await page.keyboard.press('Enter');

  await page.waitForURL('**/search**');

  await expect(page).toHaveTitle("Bit Alliance - Google Search");

  const searchRes = page.locator('div[id="search"]');

  const link = searchRes.locator('a[href="https://bit-alliance.ba/en/"]');
  expect(link).toBeTruthy();
});


