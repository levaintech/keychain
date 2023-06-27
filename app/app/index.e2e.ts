import { expect, test } from '@playwright/test';

test.describe('Example', async () => {
  test('should go to /', async ({ page, baseURL }) => {
    await page.goto('/');
    await expect(page).toHaveURL(`${baseURL}/`);
    await expect(page.getByTestId('KeyChain')).toContainText('KeyChain');
  });
});
