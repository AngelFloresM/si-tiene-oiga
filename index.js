const { chromium } = require("playwright");
const notifier = require("node-notifier");
const cron = require("node-cron");

cron.schedule("* * * * *", async () => {
  console.log(
    `Running on: ${new Date().toLocaleString("es-AR", {
      timeZone: "America/Buenos_Aires",
    })}`
  );

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://www.ikea.com/mx/es/p/olov-pata-regulable-negro-30264301/"
  );

  const content = await page.innerText(".pip-delivery__text");

  if (content === "Disponible") {
    notifier.notify({
      title: "Ya hay tus pishis patas!!",
      message: `Se detectó stock en OLOV - Pata regulable, negro`,
    });
  } else {
    console.log("Está seco por acá");
  }
  await browser.close();
});
