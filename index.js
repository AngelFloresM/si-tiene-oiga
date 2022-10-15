import { chromium } from "playwright";
import notifier from "node-notifier";
import cron from "node-cron";

cron.schedule("* * * * *", async () => {
  console.log(
    `Running on: ${new Date().toLocaleString("es-MX", {
      timeZone: "America/Mexico_City",
    })}`
  );

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://www.ikea.com/mx/es/p/nysjoen-gabinete-con-espejo-blanco-10470830/"
  );

  const title = await page.innerText(".pip-header-section__title--big");
  const description = await page.innerText(
    ".pip-header-section__description-text"
  );
  const content = await page.innerText(".pip-delivery__text");

  if (content === "Disponible") {
    notifier.notify({
      title: "Se detectó stock!!",
      message: `${title} - ${description} disponible!`,
    });
  } else {
    console.log(`No hay ${title} - ${description}`);
  }
  await browser.close();
});
