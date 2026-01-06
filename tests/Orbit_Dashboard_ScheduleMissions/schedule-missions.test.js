// schedule-missions.test.js
// Playwright end-to-end test for loading a local Orbit Schedule Missions HTML file
// This test verifies that the local HTML file loads correctly and checks for key elements on the page.
// Jaan John

const { test, expect } = require('@playwright/test');
const path = require('path');

// Resolve the absolute path to your local HTML file
const htmlFilePath = path.join(__dirname, 'orbit-schedule-missions.html');
// Convert to file URL format (file:///...)
const fileUrl = `file://${htmlFilePath}`;

test('Open local Orbit Schedule Missions HTML and verify content', async ({ page }) => {
  // Navigate to the local HTML file
  await page.goto(fileUrl);

  // Wait for the page to load fully
  await page.waitForLoadState('domcontentloaded');

  // Verify the page title
  await expect(page).toHaveTitle('Orbit - Schedule Missions');

  // Verify the main heading
  await expect(page.locator('h1.page-title')).toHaveText('Schedule Missions');

  // Check that the table is visible
  await expect(page.locator('table')).toBeVisible();

  // Verify one of the robot names is present
  await expect(page.locator('text=spot-BD-91890003')).toBeVisible();

  // Verify the "Currently running" status
  await expect(page.locator('text=Currently running')).toBeVisible();

  // Take a screenshot for debugging
  await page.screenshot({ path: 'screenshot-orbit-page.png', fullPage: true });

  // Click on the Weather Settings link (just to test interaction)
  await page.click('text=Weather Settings');

  console.log('All tests passed! Local HTML file loaded successfully.');
});