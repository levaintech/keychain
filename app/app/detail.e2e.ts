import { expect, test } from '@playwright/test';

test.describe('Detail', async () => {
  test('should go to /', async ({ page, baseURL }) => {
    await page.goto('/');

    await page.getByTestId('GoToDetail').click();
    await expect(page.getByTestId('DetailScreen')).toHaveText('Details Screen');
  });
});
