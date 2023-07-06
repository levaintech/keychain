import { expect, test } from '@playwright/test';

test('should go to Settings -> Design System ', async ({ page, baseURL }) => {
  await page.goto('/');
  await page.getByTestId('/tabs/settings').click();
  await page.getByTestId('/tabs/settings/about/design').click();
  await expect(page).toHaveURL(`${baseURL}/tabs/settings/about/design`);
});
