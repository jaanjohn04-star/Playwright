// orbit-lockout-column.test.js
// Playwright test for verifying the "Current Lockouts" column in the local Orbit Schedule Missions HTML file.
// This static HTML file represents the Schedule Missions page. Since it's a static mockup (no real backend/API),
// we can only verify the initial rendered state of the lockout badges as shown in the HTML.
// In the provided HTML:
// - One mission has an "Individual" lockout badge
// - Two missions have no lockout badge (empty <td>)
// This test checks that the column renders correctly based on the static content.
// Jaan John

const { test, expect } = require('@playwright/test');
const path = require('path');

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
  // Get all cells in the "Current Lockouts" column (6th <td> in each row)
  const lockoutCells = page.locator('tbody tr td:nth-child(6)');

  // Check that exactly one lockout badge exists with text "Individual"
  await expect(page.locator('.lockout-badge')).toHaveCount(1);
  await expect(page.locator('.lockout-badge')).toHaveText('Individual');
  console.log('Exactly one "Individual" lockout badge found (as expected in static HTML)');

  // Verify the first mission has the "Individual" lockout
  await expect(lockoutCells.nth(0).locator('.lockout-badge')).toBeVisible();

  // Verify the second and third missions have no lockout badge (empty cell)
  await expect(lockoutCells.nth(1).locator('.lockout-badge')).toBeHidden();
  await expect(lockoutCells.nth(2).locator('.lockout-badge')).toBeHidden();
  console.log('Other missions correctly show no lockout badge');

  // Optional: Log the text content of all lockout cells for clarity
  const lockoutTexts = await lockoutCells.allTextContents();
  console.log('Current Lockouts column contents:', lockoutTexts.map(t => t.trim() || '(empty)'));

  // Step 7: Take a screenshot for visual verification / debugging
  await page.screenshot({ path: 'screenshot-lockouts-column.png', fullPage: true });
  console.log('Screenshot captured');

  console.log('All assertions passed: Current Lockouts column matches expected static state.');
});