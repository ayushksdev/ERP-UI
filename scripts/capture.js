import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--hide-scrollbars'],
  });

  const page = await browser.newPage();

  // 1. Overview Page at 1280x853
  await page.setViewport({ width: 1280, height: 853, deviceScaleFactor: 1 });
  console.log('Navigating to http://localhost:3000/ ...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await new Promise((r) => setTimeout(r, 1000));

  const overviewPath = path.resolve(__dirname, '../public/screenshot_overview.png');
  await page.screenshot({ path: overviewPath });
  console.log('Saved Overview screenshot to', overviewPath);

  // 2. Students Page at 1280x721
  console.log('Clicking Students in sidebar...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('aside nav button'));
    const studentBtn = buttons.find((b) => b.textContent?.includes('Students'));
    if (studentBtn) studentBtn.click();
  });

  await page.setViewport({ width: 1280, height: 721, deviceScaleFactor: 1 });
  await new Promise((r) => setTimeout(r, 800));

  const studentsPath = path.resolve(__dirname, '../public/screenshot_students.png');
  await page.screenshot({ path: studentsPath });
  console.log('Saved Students screenshot to', studentsPath);

  // 3. Tablet View (768x1024)
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 1 });
  await new Promise((r) => setTimeout(r, 500));
  const tabletPath = path.resolve(__dirname, '../public/screenshot_tablet.png');
  await page.screenshot({ path: tabletPath });
  console.log('Saved Tablet screenshot to', tabletPath);

  // 4. Mobile View (375x812)
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 1 });
  await new Promise((r) => setTimeout(r, 500));
  const mobilePath = path.resolve(__dirname, '../public/screenshot_mobile.png');
  await page.screenshot({ path: mobilePath });
  console.log('Saved Mobile screenshot to', mobilePath);

  await browser.close();
  console.log('Visual capture complete!');
}

run().catch((err) => {
  console.error('Capture error:', err);
  process.exit(1);
});
