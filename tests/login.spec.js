const path = require('path');
const { pathToFileURL } = require('url');
const { test, expect } = require('@playwright/test');

// The live MOT sign-in page blocks automated browsers with a captcha, so by
// default these tests run against a local copy of the form (stub/login.html)
// built from the page's HTML. Set MOT_URL to point at a real environment.
const loginUrl =
  process.env.MOT_URL ||
  pathToFileURL(path.join(__dirname, '..', 'stub', 'login.html')).href;

const submitButton = 'button[type="submit"], input[type="submit"]';

test.beforeEach(async ({ page }) => {
  await page.goto(loginUrl);
});

test('sign in page shows the expected form', async ({ page }) => {
  await expect(page.locator('#username')).toBeVisible();
  await expect(page.locator('#password')).toBeVisible();
  await expect(page.locator(submitButton)).toBeVisible();
});

test('shows an error when submitting the form with no details', async ({ page }) => {
  await page.click(submitButton);
  await expect(page.locator('body')).toContainText(/enter|required/i);
});

test('shows an error with an invalid user ID and password', async ({ page }) => {
  await page.fill('#username', 'not_a_real_user');
  await page.fill('#password', 'not_a_real_password');
  await page.click(submitButton);
  await expect(page.locator('body')).toContainText(/incorrect|invalid/i);
});

test('signs in with valid credentials', async ({ page }) => {
  // demo details only work on the local stand-in page; use env variables
  // for a real account
  await page.fill('#username', process.env.MOT_USERNAME || 'demo_tester');
  await page.fill('#password', process.env.MOT_PASSWORD || 'demo_password');
  await page.click(submitButton);
  await expect(page.locator('#Login')).toBeHidden();
});