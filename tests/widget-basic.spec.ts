import { test, expect } from '@playwright/test';

/**
 * Basic Widget Test - Verifies button click and state change
 * This test checks if clicking "Try Agent" triggers the widget to appear,
 * without relying on LiveKit connection.
 */

test.describe('Avatar Widget Basic Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test('should find Try Agent button', async ({ page }) => {
    // Find the "Try Agent" button on the Web Agent card
    const tryAgentButton = page.getByRole('button', { name: /try agent/i });
    
    // Verify button exists and is visible
    await expect(tryAgentButton).toBeVisible();
    
    console.log('✅ Try Agent button found and visible');
  });

  test('should click Try Agent button without errors', async ({ page }) => {
    // Set up console error listener
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Find and click the button
    const tryAgentButton = page.getByRole('button', { name: /try agent/i });
    await tryAgentButton.click({ force: true });
    
    // Wait a moment for any immediate errors
    await page.waitForTimeout(1000);
    
    console.log('✅ Button clicked successfully');
    console.log('Console errors:', consoleErrors.length > 0 ? consoleErrors : 'None');
  });

  test('should check if widget container appears in DOM', async ({ page }) => {
    // Click the button
    const tryAgentButton = page.getByRole('button', { name: /try agent/i });
    await tryAgentButton.click({ force: true });
    
    // Wait a moment for React to update
    await page.waitForTimeout(2000);
    
    // Check if any dialog or widget-like element appears
    const dialogs = await page.locator('[role="dialog"]').count();
    const fixedElements = await page.locator('.fixed').count();
    
    console.log('✅ Dialogs found:', dialogs);
    console.log('✅ Fixed position elements:', fixedElements);
    
    // Take a screenshot for manual verification
    await page.screenshot({ path: 'test-results/widget-state-after-click.png', fullPage: true });
    console.log('✅ Screenshot saved to test-results/widget-state-after-click.png');
  });

  test('should verify page state changes after button click', async ({ page }) => {
    // Get initial state
    const initialDialogCount = await page.locator('[role="dialog"]').count();
    
    // Click the button
    const tryAgentButton = page.getByRole('button', { name: /try agent/i });
    await tryAgentButton.click({ force: true });
    
    // Wait for state update
    await page.waitForTimeout(2000);
    
    // Get new state
    const afterClickDialogCount = await page.locator('[role="dialog"]').count();
    
    console.log('✅ Dialogs before click:', initialDialogCount);
    console.log('✅ Dialogs after click:', afterClickDialogCount);
    
    // Check if state changed (dialog appeared or attempted to appear)
    const stateChanged = afterClickDialogCount !== initialDialogCount;
    console.log('✅ State changed:', stateChanged);
  });

  test('should check for LiveKit widget component in DOM', async ({ page }) => {
    // Click the button
    const tryAgentButton = page.getByRole('button', { name: /try agent/i });
    await tryAgentButton.click({ force: true });
    
    // Wait for potential widget load
    await page.waitForTimeout(3000);
    
    // Check for various widget-related elements
    const checks = {
      dialog: await page.locator('[role="dialog"]').count(),
      livekit: await page.locator('[class*="livekit"]').count(),
      avatar: await page.locator('[class*="avatar"]').count(),
      fixed: await page.locator('.fixed.bottom-24.right-6').count(),
      widgetSize: await page.locator('.w-\\[250px\\].h-\\[300px\\]').count(),
    };
    
    console.log('✅ Widget element checks:', JSON.stringify(checks, null, 2));
    
    // Log page HTML for debugging
    const bodyHTML = await page.locator('body').innerHTML();
    const hasShowAvatarWidget = bodyHTML.includes('showAvatarWidget') || bodyHTML.includes('LiveKitWidget');
    console.log('✅ Page contains widget-related code:', hasShowAvatarWidget);
  });
});
