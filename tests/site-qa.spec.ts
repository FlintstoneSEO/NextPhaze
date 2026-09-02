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

test('booking links open the connected Square scheduler', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Book Training' }).first()).toHaveAttribute('href', 'https://squareup.com/appointments/book/L37PZ2ZJNK5ET');
  await expect(page.getByRole('link', { name: 'Book Training' }).first()).toHaveAttribute('target', '_blank');

  await page.goto('/book-training/');
  await expect(page.getByRole('heading', { level: 1, name: 'Choose Your Training Format' })).toBeVisible();
  await expect(page.getByText('Online booking is available')).toBeVisible();
  await expect(page.getByRole('link', { name: /View Availability & Book/ })).toHaveCount(2);
  await expect(page.getByRole('link', { name: /View Availability & Book/ }).first()).toHaveAttribute('href', 'https://squareup.com/appointments/book/L37PZ2ZJNK5ET');
  await expect(page.getByRole('link', { name: 'Contact Coach Carrington' })).toHaveAttribute('href', 'mailto:carrington.j.Thompson15@gmail.com');
  await expect(page.getByText(/Square/i)).toHaveCount(0);
});

test('training-focus selection expands the matching item and background', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/', { waitUntil: 'networkidle' });
  const focus = page.locator('[data-training-focus]');
  const triggers = focus.getByRole('button');
  await expect(triggers).toHaveCount(3);
  await expect(triggers.nth(0)).toHaveAttribute('aria-expanded', 'true');

  await triggers.nth(1).click();
  await expect(triggers.nth(0)).toHaveAttribute('aria-expanded', 'false');
  await expect(triggers.nth(1)).toHaveAttribute('aria-expanded', 'true');
  await expect(focus.locator('.focus-background').nth(1)).toHaveClass(/is-active/);
  await expect(focus.getByRole('link', { name: 'View Wide Receiver Skills' })).toHaveAttribute('href', '/training/wide-receiver/');
});

test('training-focus mobile content does not overlap', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'networkidle' });
  const activeItem = page.locator('[data-focus-item].is-active');
  const triggerBox = await activeItem.locator('.focus-trigger').boundingBox();
  const detailBox = await activeItem.locator('.focus-detail').boundingBox();

  expect(triggerBox).not.toBeNull();
  expect(detailBox).not.toBeNull();
  expect(detailBox!.y).toBeGreaterThanOrEqual(triggerBox!.y + triggerBox!.height - 1);
  await expect(activeItem.locator('.focus-link')).toBeVisible();
});

test('group training hero copy stays clear of the media on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/training/group/', { waitUntil: 'networkidle' });

  const headingBox = await page.getByRole('heading', { level: 1 }).boundingBox();
  const mediaBox = await page.locator('.service-hero-media').boundingBox();

  expect(headingBox).not.toBeNull();
  expect(mediaBox).not.toBeNull();
  expect(headingBox!.x + headingBox!.width).toBeLessThanOrEqual(mediaBox!.x);
  await expect(page.locator('.service-hero .lede')).toBeVisible();
  await expect(page.locator('.service-hero .hero-actions')).toBeVisible();
  await page.screenshot({ path: 'artifacts/screenshots/group-training-1440.png', fullPage: true });
});

test('training sequence and format cards render without the old static-box offset', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/training/', { waitUntil: 'networkidle' });

  await expect(page.locator('.route-diagram')).toHaveAttribute('aria-label', 'Training sequence');
  await expect(page.locator('.route-diagram li')).toHaveCount(3);
  await expect(page.locator('.route-number')).toHaveText(['01', '02', '03']);
  await page.waitForTimeout(1100);

  const cards = page.locator('.format-grid article');
  const firstCard = await cards.nth(0).boundingBox();
  const secondCard = await cards.nth(1).boundingBox();
  expect(firstCard).not.toBeNull();
  expect(secondCard).not.toBeNull();
  expect(secondCard!.y).toBe(firstCard!.y);
  await page.screenshot({ path: 'artifacts/screenshots/training-1440.png', fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: 'networkidle' });
  await page.screenshot({ path: 'artifacts/screenshots/training-390.png', fullPage: true });
});

test('service-area disclaimer is not displayed and footer email remains intact', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/', { waitUntil: 'networkidle' });

  await expect(page.getByText('No unverified storefront or fixed facility is claimed.')).toHaveCount(0);
  const email = page.locator('.footer-contact a[href^="mailto:"]');
  await expect(email).toHaveText('carrington.j.Thompson15@gmail.com');
  const lineCount = await email.evaluate((element) => Math.round(element.getBoundingClientRect().height / Number.parseFloat(getComputedStyle(element).lineHeight)));
  expect(lineCount).toBe(1);
});

test('training sequence reflows across the required viewport set', async ({ page }) => {
  for (const width of [320, 375, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: width < 600 ? 844 : 1000 });
    await page.goto('/training/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1100);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `${width}px viewport overflow`).toBeLessThanOrEqual(0);
    await expect(page.locator('.route-diagram li')).toHaveCount(3);
    await expect(page.locator('.route-diagram li').nth(2)).toBeVisible();
  }
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
