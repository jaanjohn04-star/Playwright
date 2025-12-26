// orbit-lockout-column.test.ts
// Playwright test (TypeScript) for verifying the "Current Lockouts" column in the local Orbit Schedule Missions HTML mockup
// This is a static page with no dynamic lockout functionality. The test validates the initial rendered state:
// - One mission shows an "Individual" lockout badge
// - The other two missions have empty lockout cells
// Jaan John

import { test, expect } from '@playwright/test';
import path from 'path';

// Resolve the absolute path to the local HTML file
const htmlFilePath = path.join(__dirname, 'orbit-schedule-missions.html');
// Convert to file URL format (file:///...)
const fileUrl = `file://${htmlFilePath}`;

test('Verify Current Lockouts column renders correctly in local Orbit Schedule Missions page', async ({ page }) => {
  // Step 1: Navigate to the local static HTML file
  await page.goto(fileUrl);
  console.log('Navigated to local orbit-schedule-missions.html');

  // Step 2: Wait for DOM content to load
  await page.waitForLoadState('domcontentloaded');
  console.log('Page DOM loaded');

  // Step 3: Verify page title and main heading
  await expect(page).toHaveTitle('Orbit - Schedule Missions');
  await expect(page.locator('h1.page-title')).toHaveText('Schedule Missions');
  console.log('Page title and heading verified');

  // Step 4: Ensure the missions table is visible
  await expect(page.locator('table')).toBeVisible();
  console.log('Missions table is visible');

  // Step 5: Count the total number of rows in the table body (should be 3 missions)
  const rowCount = await page.locator('tbody tr').count();
  expect(rowCount).toBe(3);
  console.log(`Found ${rowCount} mission rows`);

  // Step 6: Verify the "Current Lockouts" column content
  const lockoutCells = page.locator('tbody tr td:nth-child(6)');

  // Exactly one visible lockout badge with "Individual"
  await expect(page.locator('.lockout-badge')).toHaveCount(1);
  await expect(page.locator('.lockout-badge')).toHaveText('Individual');
  console.log('Exactly one "Individual" lockout badge found');

  // First mission has the badge
  await expect(lockoutCells.nth(0).locator('.lockout-badge')).toBeVisible();

  // Second and third missions have no badge
  await expect(lockoutCells.nth(1).locator('.lockout-badge')).toBeHidden();
  await expect(lockoutCells.nth(2).locator('.lockout-badge')).toBeHidden();
  console.log('Empty lockout cells confirmed for other missions');

  // Log the actual text in the column for debugging
  const lockoutTexts = await lockoutCells.allTextContents();
  console.log('Current Lockouts column contents:', lockoutTexts.map(t => t.trim() || '(empty)'));

  // Step 7: Take a screenshot for visual verification
  await page.screenshot({ path: 'screenshot-lockouts-column.png', fullPage: true });
  console.log('Screenshot captured');

  console.log('All assertions passed: Current Lockouts column matches expected static state.');
});