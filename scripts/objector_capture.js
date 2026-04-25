const {chromium} = require('@playwright/test');
const path = require('path');
const fs = require('fs');
const OUT = 'C:/tmp/objector';
fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const browser = await chromium.launch({ headless: true });
  async function shot(p, n) { await p.screenshot({ path: path.join(OUT, n+'.png'), full_page: true }); console.log('saved', n); }
  async function shotVP(p, n) { await p.screenshot({ path: path.join(OUT, n+'.png'), full_page: false }); console.log('saved', n); }
  const desk = await browser.newPage();
  await desk.setViewportSize({ width: 1440, height: 900 });
  await desk.goto( 'http://localhost:3000', { waitUntil: 'networkidle' });
  await shot(desk, 'home_desktop_full');
  await shotVP(desk, 'home_desktop_above_fold');
  const mob = await browser.newPage();
  await mob.setViewportSize({ width: 390, height: 844 });
  await mob.goto( 'http://localhost:3000', { waitUntil: 'networkidle' });
  await shot(mob, 'home_mobile_full');
  await shotVP(mob, 'home_mobile_above_fold');
  for (const pct of [25, 50, 75, 100]) {
    await desk.evaluate((p) => { window.scrollTo(0, document.body.scrollHeight * p / 100); }, pct);
    await desk.waitForTimeout(500);
    await shotVP(desk, 'home_scroll_' + pct + 'pct');
  }
  await desk.evaluate(() => window.scrollTo(0, 0));
  await desk.waitForTimeout(300);
  const navLinks = await desk.locator('nav a').all();
  for (let i = 0; i < navLinks.length; i++) {
    const txt = ((await navLinks[i].textContent()) || 'link').trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
    await navLinks[i].hover();
    await desk.waitForTimeout(350);
    await shotVP(desk, 'nav_hover_' + txt);
  }
  await desk.goto( 'http://localhost:3000', { waitUntil: 'networkidle' });
  const cta = desk.locator('a').filter({ hasText: /get started/i, }).first();
  if (await cta.count() > 0) {
    await cta.click();
    await desk.waitForLoadState('networkidle');
    await shotVP(desk, 'cta_click_result');
    console.log('CTA url:', desk.url());
  } else { console.log('no CTA'); }
  await browser.close();
  console.log('Done');
})().catch(e => { console.error(e.message); process.exit(1); });