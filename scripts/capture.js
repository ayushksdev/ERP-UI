import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function clickSidebar(page, name) {
  await page.evaluate((navName) => {
    const buttons = Array.from(document.querySelectorAll('aside nav button'));
    const btn = buttons.find((b) => b.textContent?.toLowerCase().includes(navName.toLowerCase()));
    if (btn) btn.click();
  }, name);
  await new Promise((r) => setTimeout(r, 600));
}

async function run() {
  console.log('Launching browser for visual verification...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--hide-scrollbars'],
  });

  const page = await browser.newPage();

  // 1. Overview Page at 1280x853 (Figma frame size)
  await page.setViewport({ width: 1280, height: 853, deviceScaleFactor: 1 });
  console.log('Navigating to http://localhost:3001/ ...');
  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle0' });
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await new Promise((r) => setTimeout(r, 1000));

  const overviewPath = path.resolve(__dirname, '../public/screenshot_overview.png');
  await page.screenshot({ path: overviewPath });
  console.log('Saved Overview screenshot to', overviewPath);

  // 2. Students Page at 1280x721
  await clickSidebar(page, 'Students');
  await page.setViewport({ width: 1280, height: 721, deviceScaleFactor: 1 });
  const studentsPath = path.resolve(__dirname, '../public/screenshot_students.png');
  await page.screenshot({ path: studentsPath });
  console.log('Saved Students screenshot to', studentsPath);

  // 3. Faculty Page
  await clickSidebar(page, 'Faculty');
  const facultyPath = path.resolve(__dirname, '../public/screenshot_faculty.png');
  await page.screenshot({ path: facultyPath });
  console.log('Saved Faculty screenshot to', facultyPath);

  // 4. Library Page
  await clickSidebar(page, 'Library');
  const libraryPath = path.resolve(__dirname, '../public/screenshot_library.png');
  await page.screenshot({ path: libraryPath });
  console.log('Saved Library screenshot to', libraryPath);

  // 5. Fees & Finance Page
  await clickSidebar(page, 'Fees');
  const feesPath = path.resolve(__dirname, '../public/screenshot_fees.png');
  await page.screenshot({ path: feesPath });
  console.log('Saved Fees screenshot to', feesPath);

  // 6. Hostel Page
  await clickSidebar(page, 'Hostel');
  const hostelPath = path.resolve(__dirname, '../public/screenshot_hostel.png');
  await page.screenshot({ path: hostelPath });
  console.log('Saved Hostel screenshot to', hostelPath);

  // 7. Transport Page
  await clickSidebar(page, 'Transport');
  const transportPath = path.resolve(__dirname, '../public/screenshot_transport.png');
  await page.screenshot({ path: transportPath });
  console.log('Saved Transport screenshot to', transportPath);

  // 8. Reports Page
  await clickSidebar(page, 'Reports');
  const reportsPath = path.resolve(__dirname, '../public/screenshot_reports.png');
  await page.screenshot({ path: reportsPath });
  console.log('Saved Reports screenshot to', reportsPath);

  // 9. Settings Page
  await clickSidebar(page, 'Settings');
  const settingsPath = path.resolve(__dirname, '../public/screenshot_settings.png');
  await page.screenshot({ path: settingsPath });
  console.log('Saved Settings screenshot to', settingsPath);

  // 10. Tablet View (768x1024)
  await clickSidebar(page, 'Overview');
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 1 });
  await new Promise((r) => setTimeout(r, 600));
  const tabletPath = path.resolve(__dirname, '../public/screenshot_tablet.png');
  await page.screenshot({ path: tabletPath });
  console.log('Saved Tablet screenshot to', tabletPath);

  // 11. Mobile View (375x812)
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 1 });
  await new Promise((r) => setTimeout(r, 600));
  const mobilePath = path.resolve(__dirname, '../public/screenshot_mobile.png');
  await page.screenshot({ path: mobilePath });
  console.log('Saved Mobile screenshot to', mobilePath);

  await browser.close();
  console.log('All module and responsive screenshots captured successfully!');
}

run().catch((err) => {
  console.error('Capture error:', err);
  process.exit(1);
});
