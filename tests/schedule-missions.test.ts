// schedule-missions.test.ts
// Playwright end-to-end test for loading a local Orbit Schedule Missions HTML file
// This test verifies that the local HTML file loads correctly and checks for key elements on the page.
// Jaan John

import { test, expect } from '@playwright/test';
import path from 'path';

const htmlFilePath = path.join(__dirname, 'orbit-schedule-missions.html');
const fileUrl = `file://${htmlFilePath}`;

test('Open local OrbitSchedule Missions HTML and verify content', async ({ page }) => {
  await page.goto(fileUrl);
  await page.waitForLoadState('domcontentloaded');

  await expect(page).toHaveTitle('Orbit - Schedule Missions');
  await expect(page.locator('h1.page-title')).toHaveText('Schedule Missions');
  await expect(page.locator('table')).toBeVisible();
  await expect(page.getByText('spot-BD-91890003')).toBeVisible();
  await expect(page.getByText('Currently running')).toBeVisible();

  await page.screenshot({ path: 'screenshot-orbit-page.png', fullPage: true });
});