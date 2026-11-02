import { test, expect } from '@playwright/test';

test('home: SEO básico, CTA WhatsApp y schema', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/.+/);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^https?:\/\//);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /og\.png$/);

  const wa = page.locator('a[href^="https://wa.me/"]').first();
  await expect(wa).toHaveAttribute('href', /\?text=.+/);

  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
  const types = schemas.map((s) => JSON.parse(s)['@type']);
  expect(types).toContain('FAQPage');
  expect(types).toContain('AccountingService');
});

test('click en WhatsApp dispara whatsapp_click', async ({ page, context }) => {
  await context.route('https://wa.me/**', (r) => r.abort());
  await page.goto('/');
  await page.locator('[data-section="hero"] a[href^="https://wa.me/"]').click();
  const events = await page.evaluate(() => window.dataLayer.map((e) => (e as { event?: string }).event));
  expect(events).toContain('whatsapp_click');
});

test('formulario: éxito dispara generate_lead', async ({ page }) => {
  await page.goto('/#contacto');
  await page.fill('#f-name', 'Prueba Playwright');
  await page.fill('#f-phone', '442 000 0000');
  await page.selectOption('#f-service', 'Nómina e IMSS');
  await page.selectOption('#f-regimen', 'Persona moral');
  await page.selectOption('#f-employees', '6 a 20');
  await page.waitForTimeout(3100); // trampa de tiempo mínimo del endpoint
  await page.click('#lead-form button[type="submit"]');
  await expect(page.locator('#form-status')).toContainText('Gracias');
  const lead = await page.evaluate(() => window.dataLayer.find((e) => (e as { event?: string }).event === 'generate_lead'));
  expect(lead).toMatchObject({ service: 'Nómina e IMSS', regimen: 'Persona moral', employees: '6 a 20', source: 'landing_form' });
});

test('formulario: error muestra fallback a WhatsApp', async ({ page }) => {
  await page.route('**/api/lead.php', (r) => r.fulfill({ status: 500, body: '{"ok":false}' }));
  await page.goto('/#contacto');
  await page.fill('#f-name', 'Prueba');
  await page.fill('#f-phone', '4420000000');
  await page.selectOption('#f-service', { index: 1 });
  await page.selectOption('#f-regimen', { index: 1 });
  await page.selectOption('#f-employees', { index: 1 });
  await page.click('#lead-form button[type="submit"]');
  await expect(page.locator('#form-status a[href^="https://wa.me/"]')).toBeVisible();
});

test('formulario: campos obligatorios bloquean el envío', async ({ page }) => {
  let posted = false;
  await page.route('**/api/lead.php', (r) => {
    posted = true;
    return r.fulfill({ status: 200, body: '{"ok":true}' });
  });
  await page.goto('/#contacto');
  await page.fill('#f-name', 'Prueba');
  await page.fill('#f-phone', '4420000000');
  await page.click('#lead-form button[type="submit"]');
  await expect(page.locator('#f-regimen:invalid')).toHaveCount(1);
  expect(posted).toBe(false);
});

test('secciones del despacho: planes, calendario, proceso y testimonios de ejemplo', async ({ page }) => {
  await page.goto('/');
  for (const id of ['servicios', 'a-quien-atendemos', 'planes', 'calendario', 'proceso', 'opiniones', 'preguntas', 'ubicacion', 'contacto']) {
    await expect(page.locator(`section#${id} h2`)).toBeVisible();
  }
  await expect(page.locator('#planes > div > ul > li')).toHaveCount(3);
  // Nunca se muestra el marcador TODO-CLIENTE al visitante.
  expect(await page.locator('body').innerText()).not.toContain('TODO-CLIENTE');
  await expect(page.locator('[data-testid="calendar-note"]')).toContainText('Referencia');
  await expect(page.locator('[data-testid="example-note"]')).toBeVisible();
});

test('formulario: honeypot presente y oculto', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#f-website')).toBeAttached();
  await expect(page.locator('#f-website')).not.toBeInViewport();
});

test('404 real y robots/sitemap', async ({ page, request }) => {
  const res = await request.get('/no-existe-esta-ruta');
  expect(res.status()).toBe(404);
  expect((await request.get('/404.html')).status()).toBe(200);
  expect(await (await request.get('/robots.txt')).text()).toContain('Sitemap:');
  expect((await request.get('/sitemap-index.xml')).status()).toBe(200);
  await page.goto('/404.html');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
});

test('sin scroll horizontal y footer visible', async ({ page }) => {
  await page.goto('/');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
  // En móvil, si algo desborda, Chrome amplía el viewport de layout (zoom out) y scrollWidth "cuadra":
  // por eso también se exige que el viewport de layout siga midiendo lo mismo que el dispositivo.
  expect(await page.evaluate(() => window.innerWidth)).toBe(page.viewportSize()?.width);
  await page.locator('footer').scrollIntoViewIfNeeded();
  await expect(page.locator('footer')).toBeVisible();
});

test('capturas', async ({ browser }, info) => {
  // Contexto propio a 1x: a 2x la página completa supera el límite de textura de Chrome (16384 px) y se repite.
  // El viewport se agranda a la altura total del documento (fullPage en emulación móvil duplica secciones).
  const mobile = info.project.name === 'mobile';
  const width = mobile ? 360 : 1280;
  const context = await browser.newContext({ viewport: { width, height: 800 }, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
  const page = await context.newPage();
  await page.goto('/');
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.setViewportSize({ width, height });
  await page.screenshot({ path: `shots/${info.project.name}.png` });
  await context.close();
});
