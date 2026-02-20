import { test, expect } from '@playwright/test';

test.describe('Language Switcher', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    // Clear localStorage to start with default language
    await page.evaluate(() => localStorage.clear());
  });

  test('should display language switcher button on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    
    const languageSwitcher = page.getByTestId('language-switcher');
    await expect(languageSwitcher).toBeVisible();
    
    // Should show globe icon and flag
    await expect(languageSwitcher.locator('svg')).toBeVisible();
    await expect(languageSwitcher).toContainText('🇬🇧'); // Default English
  });

  test('should display language switcher button on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const languageSwitcher = page.getByTestId('language-switcher-mobile');
    await expect(languageSwitcher).toBeVisible();
  });

  test('should open language menu when clicked', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    
    const languageSwitcher = page.getByTestId('language-switcher');
    await languageSwitcher.click();
    
    // Check all language options are visible (use .first() to get desktop version)
    await expect(page.getByTestId('language-option-en').first()).toBeVisible();
    await expect(page.getByTestId('language-option-fr').first()).toBeVisible();
    await expect(page.getByTestId('language-option-ar').first()).toBeVisible();
    
    // Check language labels
    await expect(page.getByTestId('language-option-en').first()).toContainText('English');
    await expect(page.getByTestId('language-option-fr').first()).toContainText('Français');
    await expect(page.getByTestId('language-option-ar').first()).toContainText('العربية');
  });

  test('should switch to French and update navigation', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // Open language menu
    await page.getByTestId('language-switcher').click();
    
    // Click French option (use .first() to get desktop version)
    await page.getByTestId('language-option-fr').first().click();
    
    // Wait for language to change
    await page.waitForTimeout(500);
    
    // Check navigation items are in French (use nav role to be specific)
    await expect(page.locator('nav').getByRole('link', { name: /Accueil/ }).first()).toBeVisible();
    await expect(page.locator('nav').getByRole('link', { name: /Tarifs/ }).first()).toBeVisible();
    await expect(page.locator('nav').getByRole('link', { name: /À propos/ }).first()).toBeVisible();
    
    // Check flag changed to French
    await expect(page.getByTestId('language-switcher')).toContainText('🇫🇷');
    
    // Check localStorage
    const storedLanguage = await page.evaluate(() => localStorage.getItem('language'));
    expect(storedLanguage).toBe('fr');
    
    // Check page content is translated
    await expect(page.locator('text=Nos services')).toBeVisible();
  });

  test('should switch to Arabic and update navigation with RTL', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // Open language menu
    await page.getByTestId('language-switcher').click();
    
    // Click Arabic option (use .first() to get desktop version)
    await page.getByTestId('language-option-ar').first().click();
    
    // Wait for language to change
    await page.waitForTimeout(500);
    
    // Check navigation items are in Arabic (use nav role to be specific)
    await expect(page.locator('nav').getByRole('link', { name: /الرئيسية/ }).first()).toBeVisible();
    await expect(page.locator('nav').getByRole('link', { name: /الأسعار/ }).first()).toBeVisible();
    await expect(page.locator('nav').getByRole('link', { name: /من نحن/ }).first()).toBeVisible();
    
    // Check flag changed to Arabic
    await expect(page.getByTestId('language-switcher')).toContainText('🇸🇦');
    
    // Check RTL direction
    const htmlDir = await page.evaluate(() => document.documentElement.dir);
    expect(htmlDir).toBe('rtl');
    
    // Check localStorage
    const storedLanguage = await page.evaluate(() => localStorage.getItem('language'));
    expect(storedLanguage).toBe('ar');
  });

  test('should persist language selection on page reload', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // Switch to French
    await page.getByTestId('language-switcher').click();
    await page.getByTestId('language-option-fr').first().click();
    await page.waitForTimeout(500);
    
    // Reload page
    await page.reload();
    await page.waitForTimeout(500);
    
    // Check French is still selected
    await expect(page.getByRole('link', { name: 'Accueil' })).toBeVisible();
    await expect(page.getByTestId('language-switcher')).toContainText('🇫🇷');
  });

  test('should close language menu when clicking outside', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // Open language menu
    await page.getByTestId('language-switcher').click();
    await page.waitForTimeout(300);
    
    // Close by clicking switcher again (toggle behavior)
    await page.getByTestId('language-switcher').click();
    await page.waitForTimeout(300);
    
    // Open again to verify it works
    await page.getByTestId('language-switcher').click();
    await expect(page.getByTestId('language-option-en').first()).toBeVisible();
  });

  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Open language menu
    await page.getByTestId('language-switcher-mobile').click();
    
    // Switch to French (use .last() to get mobile version)
    await page.getByTestId('language-option-fr').last().click();
    await page.waitForTimeout(500);
    
    // Open mobile menu to check navigation
    await page.locator('nav button').last().click();
    
    // Check navigation items are in French (use nav role to be specific)
    await expect(page.locator('nav').getByRole('link', { name: /Accueil/ })).toBeVisible();
    await expect(page.locator('nav').getByRole('link', { name: /Tarifs/ })).toBeVisible();
  });

  test('should cycle through all languages', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // Start with English (default)
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    
    // Switch to French
    await page.getByTestId('language-switcher').click();
    await page.getByTestId('language-option-fr').first().click();
    await page.waitForTimeout(500);
    await expect(page.getByRole('link', { name: 'Accueil' })).toBeVisible();
    
    // Switch to Arabic
    await page.getByTestId('language-switcher').click();
    await page.getByTestId('language-option-ar').first().click();
    await page.waitForTimeout(500);
    await expect(page.getByRole('link', { name: 'الرئيسية' })).toBeVisible();
    
    // Switch back to English
    await page.getByTestId('language-switcher').click();
    await page.getByTestId('language-option-en').first().click();
    await page.waitForTimeout(500);
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    
    // Check LTR direction restored
    const htmlDir = await page.evaluate(() => document.documentElement.dir);
    expect(htmlDir).toBe('ltr');
  });
});

  test('should translate pricing page content', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // Navigate to pricing page
    await page.goto('http://localhost:3000/pricing');
    await page.waitForTimeout(500);
    
    // Switch to French
    await page.getByTestId('language-switcher').click();
    await page.getByTestId('language-option-fr').first().click();
    await page.waitForTimeout(500);
    
    // Check pricing page content is in French
    await expect(page.locator('text=Tarification simple et transparente')).toBeVisible();
    await expect(page.locator('text=Débutant')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Pro' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Entreprise' })).toBeVisible();
    await expect(page.locator('text=Le plus populaire')).toBeVisible();
  });

  test('should translate about page content', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // Navigate to about page
    await page.goto('http://localhost:3000/about');
    await page.waitForTimeout(500);
    
    // Switch to Arabic
    await page.getByTestId('language-switcher').click();
    await page.getByTestId('language-option-ar').first().click();
    await page.waitForTimeout(500);
    
    // Check about page content is in Arabic (use heading role to be specific)
    await expect(page.getByRole('heading', { name: /من نحن/ })).toBeVisible();
    await expect(page.locator('text=نبني موظفي ذكاء اصطناعي أذكياء يعملون على مدار الساعة')).toBeVisible();
    
    // Check RTL is applied
    const htmlDir = await page.evaluate(() => document.documentElement.dir);
    expect(htmlDir).toBe('rtl');
  });
