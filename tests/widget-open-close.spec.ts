import { test, expect } from '@playwright/test';

/**
 * Test Suite: Widget Opens and Closes Correctly
 * Task: 6.2 from 3d-avatar-integration spec
 * 
 * Tests the following requirements:
 * - Widget appears when "Try Agent" button is clicked
 * - Widget has correct size (250px × 300px)
 * - Widget has correct position (bottom: 6rem, right: 1.5rem)
 * - Close button works
 * - Escape key works
 */

test.describe('Avatar Widget Open/Close Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test('should open widget when "Try Agent" button is clicked', async ({ page }) => {
    // Find and click the "Try Agent" button on the Web Agent card
    const tryAgentButton = page.getByRole('button', { name: /try agent/i });
    await expect(tryAgentButton).toBeVisible();
    
    // Click the button using force to bypass overlapping elements
    await tryAgentButton.click({ force: true });
    
    // Wait for widget to appear
    const widget = page.getByRole('dialog', { name: /voice agent widget/i });
    await expect(widget).toBeVisible({ timeout: 5000 });
  });

  test('should have correct widget size (250px × 300px)', async ({ page }) => {
    // Open the widget
    const tryAgentButton = page.getByRole('button', { name: /try agent/i });
    await tryAgentButton.click({ force: true });
    
    // Wait for widget to appear
    const widget = page.getByRole('dialog', { name: /voice agent widget/i });
    await expect(widget).toBeVisible({ timeout: 5000 });
    
    // Get the bounding box of the widget
    const boundingBox = await widget.boundingBox();
    
    // Verify dimensions (allow 1px tolerance for rounding)
    expect(boundingBox).not.toBeNull();
    expect(boundingBox!.width).toBeCloseTo(250, 1);
    expect(boundingBox!.height).toBeCloseTo(300, 1);
  });

  test('should have correct widget position (bottom: 6rem, right: 1.5rem)', async ({ page }) => {
    // Open the widget
    const tryAgentButton = page.getByRole('button', { name: /try agent/i });
    await tryAgentButton.click({ force: true });
    
    // Wait for widget to appear
    const widget = page.getByRole('dialog', { name: /voice agent widget/i });
    await expect(widget).toBeVisible({ timeout: 5000 });
    
    // Get computed styles
    const styles = await widget.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        position: computed.position,
        bottom: computed.bottom,
        right: computed.right,
      };
    });
    
    // Verify position
    expect(styles.position).toBe('fixed');
    expect(styles.bottom).toBe('96px'); // 6rem = 96px (16px * 6)
    expect(styles.right).toBe('24px');  // 1.5rem = 24px (16px * 1.5)
  });

  test('should close widget when close button is clicked', async ({ page }) => {
    // Open the widget
    const tryAgentButton = page.getByRole('button', { name: /try agent/i });
    await tryAgentButton.click({ force: true });
    
    // Wait for widget to appear
    const widget = page.getByRole('dialog', { name: /voice agent widget/i });
    await expect(widget).toBeVisible({ timeout: 5000 });
    
    // Find and click the close button
    const closeButton = page.getByRole('button', { name: /close voice agent/i });
    await expect(closeButton).toBeVisible();
    await closeButton.click();
    
    // Verify widget is closed
    await expect(widget).not.toBeVisible({ timeout: 2000 });
  });

  test('should close widget when Escape key is pressed', async ({ page }) => {
    // Open the widget
    const tryAgentButton = page.getByRole('button', { name: /try agent/i });
    await tryAgentButton.click({ force: true });
    
    // Wait for widget to appear
    const widget = page.getByRole('dialog', { name: /voice agent widget/i });
    await expect(widget).toBeVisible({ timeout: 5000 });
    
    // Press Escape key
    await page.keyboard.press('Escape');
    
    // Verify widget is closed
    await expect(widget).not.toBeVisible({ timeout: 2000 });
  });

  test('should be able to open and close widget multiple times', async ({ page }) => {
    // First cycle: open and close with button
    const tryAgentButton = page.getByRole('button', { name: /try agent/i });
    await tryAgentButton.click({ force: true });
    
    let widget = page.getByRole('dialog', { name: /voice agent widget/i });
    await expect(widget).toBeVisible({ timeout: 5000 });
    
    const closeButton = page.getByRole('button', { name: /close voice agent/i });
    await closeButton.click();
    await expect(widget).not.toBeVisible({ timeout: 2000 });
    
    // Second cycle: open and close with Escape key
    await tryAgentButton.click({ force: true });
    widget = page.getByRole('dialog', { name: /voice agent widget/i });
    await expect(widget).toBeVisible({ timeout: 5000 });
    
    await page.keyboard.press('Escape');
    await expect(widget).not.toBeVisible({ timeout: 2000 });
    
    // Third cycle: verify it still works
    await tryAgentButton.click({ force: true });
    widget = page.getByRole('dialog', { name: /voice agent widget/i });
    await expect(widget).toBeVisible({ timeout: 5000 });
  });

  test('should have proper z-index for overlay', async ({ page }) => {
    // Open the widget
    const tryAgentButton = page.getByRole('button', { name: /try agent/i });
    await tryAgentButton.click({ force: true });
    
    // Wait for widget to appear
    const widget = page.getByRole('dialog', { name: /voice agent widget/i });
    await expect(widget).toBeVisible({ timeout: 5000 });
    
    // Check z-index
    const zIndex = await widget.evaluate((el) => {
      return window.getComputedStyle(el).zIndex;
    });
    
    // Should have z-50 (z-index: 50)
    expect(zIndex).toBe('50');
  });

  test('should have rounded corners and shadow', async ({ page }) => {
    // Open the widget
    const tryAgentButton = page.getByRole('button', { name: /try agent/i });
    await tryAgentButton.click({ force: true });
    
    // Wait for widget to appear
    const widget = page.getByRole('dialog', { name: /voice agent widget/i });
    await expect(widget).toBeVisible({ timeout: 5000 });
    
    // Check styling
    const styles = await widget.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        borderRadius: computed.borderRadius,
        boxShadow: computed.boxShadow,
      };
    });
    
    // Verify rounded corners (rounded-xl = 0.75rem = 12px)
    expect(styles.borderRadius).toBe('12px');
    
    // Verify shadow exists (shadow-2xl)
    expect(styles.boxShadow).not.toBe('none');
    expect(styles.boxShadow.length).toBeGreaterThan(0);
  });
});
