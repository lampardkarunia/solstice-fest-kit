import { chromium } from "playwright-core";

const exe =
  "/home/hatch/.cache/puppeteer/chrome/linux-157.0.8103.50/chrome-linux64/chrome";
const root = new URL("../", import.meta.url).pathname;

const browser = await chromium.launch({
  executablePath: exe,
  args: ["--no-sandbox", "--force-color-profile=srgb"],
});

async function shot(file, out, width) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto("file://" + root + file, { waitUntil: "networkidle" });
  await page.screenshot({ path: root + out, fullPage: true });
  console.log("wrote", out);
  await page.close();
}

await shot("out/confirmation-email.html", "previews/email.png", 760);
await shot("out/event-page.html", "previews/page.png", 1280);
await shot("out/clients/gmail.html", "previews/email-gmail.png", 1100);

await browser.close();
