/**
 * 🤘 Welcome to Stagehand!
 *
 * TO RUN THIS PROJECT:
 * ```
 * npm install
 * npm run start
 * ```
 *
 * To edit config, see `stagehand.config.ts`
 *
 */
import { Stagehand } from "@/dist";
import StagehandConfig from "@/stagehand.config";
import { Browser, chromium } from "@playwright/test";
import path from "path";
import fs from "fs";
import os from "os";
import { z } from "zod";
import { LocalBrowserLaunchOptions } from "@/types/stagehand";

export async function example() {
  const { context } = await initCdpBrowser();
  const contextPath = getContextPath(StagehandConfig.localBrowserLaunchOptions);

  const stagehand = new Stagehand({
    ...StagehandConfig,
    browserContext: {
      context,
      contextPath,
      createNewPage: true,
    },
  });
  await stagehand.init();

  const page = stagehand.page;

  // https://www.oracle.com/customers/?product=mpd-cld-apps:fusion-suite:hcm~mpd-cld-apps:fusion-suite:erp
  await page.goto(
    "https://www.oracle.com/customers/?product=mpd-cld-apps:fusion-suite:hcm~mpd-cld-apps:fusion-suite:erp",
    { waitUntil: "load" },
  );

  const allCustomerCards = [];

  const MAX_INTERATIONS = 100;
  let currentIter = 0;

  let hasMoreResults = true;
  while (hasMoreResults && currentIter < MAX_INTERATIONS) {
    const { customerCards } = await page.extract({
      instruction:
        "Extract the information from the customer cards on the page, starting at the current scroll position, and ending at the bottom of the page.",
      schema: z.object({
        customerCards: z.array(
          z.object({
            customerName: z
              .string()
              .describe("The name of the customer extracted from the heading."),
            heading: z
              .string()
              .describe("The heading summary on the customer card."),
            logoUrl: z
              .string()
              .describe("The full url to the customer logo on the card."),
            industry: z.string().describe("The customer industry on the card."),
            location: z.string().describe("The customer location on the card."),
            button: z
              .object({
                label: z
                  .string()
                  .describe(
                    'The button label. Usually "Read more" or something similar.',
                  ),
                url: z.string().describe("The full href url to the button."),
              })
              .describe("The action button on the customer card."),
          }),
        ),
      }),
      useTextExtract: false, // Set this to true if you want to extract longer paragraphs
    });

    allCustomerCards.push(...customerCards);

    console.log(JSON.stringify(customerCards, null, "\t"));
    console.log(`Extracted ${customerCards.length} customers.`);

    // await page.act('go down by one page to have new customer cards visible.');
    await page.keyboard.press("PageDown");

    // const overlayResults = await page.observe(
    //   'Close the "chat now" overlay if visible.'
    // );
    // await drawObserveOverlay(page, overlayResults); // Highlight the search box
    // await page.waitForTimeout(1000);
    // await clearOverlays(page); // Remove the highlight before typing
    // await page.act(overlayResults[0]);

    const { hasSeeMoreButton } = await page.extract({
      instruction:
        'Check if the "See more" button at the bottom of the page is currently visible.',
      schema: z.object({
        hasSeeMoreButton: z
          .boolean()
          .describe(
            'true if the "See more" button at the bottom of the page is visible. false if not.',
          ),
      }),
    });

    if (hasSeeMoreButton) {
      await page.act('Click "See more" if visible, to load more customers.');
      await page.waitForTimeout(1000);
    } else {
      hasMoreResults = false;
      break;
    }

    currentIter++;
  }

  console.log(JSON.stringify(allCustomerCards, null, "\t"));
  console.log(`Extracted ${allCustomerCards.length} customers total.`);
}

const getContextPath = (
  localBrowserLaunchOptions: LocalBrowserLaunchOptions,
) => {
  let userDataDir = localBrowserLaunchOptions?.userDataDir;
  if (!userDataDir) {
    const tmpDirPath = path.join(os.tmpdir(), "stagehand");
    if (!fs.existsSync(tmpDirPath)) {
      fs.mkdirSync(tmpDirPath, { recursive: true });
    }

    const tmpDir = fs.mkdtempSync(path.join(tmpDirPath, "ctx_"));
    fs.mkdirSync(path.join(tmpDir, "userdir/Default"), { recursive: true });

    const defaultPreferences = {
      plugins: {
        always_open_pdf_externally: true,
      },
    };

    fs.writeFileSync(
      path.join(tmpDir, "userdir/Default/Preferences"),
      JSON.stringify(defaultPreferences),
    );
    userDataDir = path.join(tmpDir, "userdir");
  }

  return userDataDir;
};

const initCdpBrowser = async () => {
  const browser = await chromium.connectOverCDP("http://localhost:9222");
  const context = browser.contexts()[0];
  // const page = context.pages()[0];

  console.log(
    JSON.stringify({ version: browser.version }),
    "Connected to user browser",
  );
  try {
    const cdp = await browser.newBrowserCDPSession();
    const behavior = {
      behavior: "default" as const,
    };
    await cdp.send("Browser.setDownloadBehavior", behavior);
  } catch (error) {
    console.error(
      error,
      `got error while setting download behaviour to default`,
    );
  }

  const callback = async (browser: Browser) => {
    console.log("Browser disconnected");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const browserCloseReason = browser._closeReason;
    if (browserCloseReason) {
      if (browserCloseReason === "Browser closed after task complete") {
        console.log(browserCloseReason, "Browser closed by plena");
      } else {
        console.log(browserCloseReason, "Plena Did NOT close the Browser");
      }
    } else {
      console.log(browser, "Plena Did NOT close the Browser");
    }
  };

  browser.on("disconnected", callback.bind(this));

  return { browser, context };
};

(async () => {
  await example();
})();
