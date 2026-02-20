import { test, expect } from '@playwright/test';

test.describe('Service Cards Translation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.evaluate(() => localStorage.clear());
    await page.waitForLoadState('networkidle');
  });

  test('should display service cards in English by default', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // Wait for cards to be visible
    await page.waitForTimeout(1000);
    
    // Check English titles are visible using heading role
    await expect(page.getByRole('heading', { name: 'WhatsApp Agent' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Calling Agent' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Web Agent' })).toBeVisible();
  });

  test('should translate service cards to French', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // Wait for page to load
    await page.waitForTimeout(1000);
    
    // Switch to French
    await page.getByTestId('language-switcher').click();
    await page.getByTestId('language-option-fr').first().click();
    await page.waitForTimeout(500);
    
    // Check French titles using heading role
    await expect(page.getByRole('heading', { name: 'Agent WhatsApp' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Agent Vocal' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Agent Web' })).toBeVisible();
  });

  test('should translate service cards to Arabic', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // Wait for page to load
    await page.waitForTimeout(1000);
    
    // Switch to Arabic
    await page.getByTestId('language-switcher').click();
    await page.getByTestId('language-option-ar').first().click();
    await page.waitForTimeout(500);
    
    // Check Arabic titles using heading role
    await expect(page.getByRole('heading', { name: 'وكيل واتساب' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'وكيل المكالمات' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'وكيل الويب' })).toBeVisible();
  });

  test('should translate service cards on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Wait for page to load
    await page.waitForTimeout(1000);
    
    // Switch to French
    await page.getByTestId('language-switcher-mobile').click();
    await page.getByTestId('language-option-fr').last().click();
    await page.waitForTimeout(500);
    
    // Check French titles are visible on mobile using heading role
    await expect(page.getByRole('heading', { name: 'Agent WhatsApp' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Agent Vocal' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Agent Web' })).toBeVisible();
  });
});
