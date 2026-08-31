import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = [
  '/',
  '/training/',
  '/training/one-on-one/',
  '/training/group/',
  '/training/speed-agility/',
  '/training/wide-receiver/',
  '/coach-carrington/',
  '/book-training/',
  '/privacy/'
];

for (const route of routes) {
  test(`${route} has one H1, no overflow, and no serious axe violations`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const response = await page.goto(route, { waitUntil: 'networkidle' });
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator('h1')).toHaveCount(1);

    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);

    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((violation) => ['critical', 'serious'].includes(violation.impact ?? ''));
    expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
  });
}

test('mobile navigation opens, exposes links, and closes', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const menuButton = page.locator('[data-menu-button]');
  await menuButton.focus();
  await page.keyboard.press('Enter');
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Book Training' }).first()).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
});

test('Book Training journey reaches the Square-ready page', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.getByRole('link', { name: 'Book Training' }).first().click();
  await expect(page).toHaveURL(/\/book-training\/$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Choose Your Training Format' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Square Link Pending' })).toHaveCount(2);
});

for (const width of [320, 375, 390, 768, 1024, 1440]) {
  test(`homepage screenshot and reflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 600 ? 844 : 1000 });
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.locator('main')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    await page.screenshot({ path: `artifacts/screenshots/home-${width}.png`, fullPage: true });
  });
}

test('dark theme preserves homepage contrast and layout', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'networkidle' });
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter((violation) => ['critical', 'serious'].includes(violation.impact ?? ''));
  expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
  await page.screenshot({ path: 'artifacts/screenshots/home-390-dark.png', fullPage: true });
});

for (const route of ['/coach-carrington/', '/book-training/']) {
  test(`${route} key route screenshots`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(route, { waitUntil: 'networkidle' });
    const name = route.split('/').filter(Boolean).join('-');
    await page.screenshot({ path: `artifacts/screenshots/${name}-1440.png`, fullPage: true });
  });
}
