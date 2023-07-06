import { expect, test } from '@playwright/test';

test('should go to Settings -> Design System ', async ({ page, baseURL }) => {
  await page.goto('/');
  await page.getByTestId('/keychain/settings').click();
  await page.getByTestId('/keychain/settings/about/design').click();
  await expect(page).toHaveURL(`${baseURL}/keychain/settings/about/design`);
});
