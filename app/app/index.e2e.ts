import { expect, test } from '@playwright/test';

test.describe('Index', async () => {
  test('should go to /', async ({ page, baseURL }) => {
    await page.goto('/');
    await expect(page).toHaveURL(`${baseURL}/tabs`);
  });
});
