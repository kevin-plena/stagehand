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

  const page = await context.newPage();

  const stagehand = new Stagehand({
    ...StagehandConfig,
    browserContext: {
      context,
      contextPath,
      // createNewPage: true,
      page,
    },
  });
  await stagehand.init();

  const shPage = stagehand.page;

  // https://www.oracle.com/customers/?product=mpd-cld-apps:fusion-suite:hcm~mpd-cld-apps:fusion-suite:erp
  await shPage.goto(
    "https://www.oracle.com/customers/?product=mpd-cld-apps:fusion-suite:hcm~mpd-cld-apps:fusion-suite:erp&region=rgn-n",
    { waitUntil: "load" },
  );
  await shPage.waitForTimeout(1000);

  const CARDS_PER_PAGE = 18;
  const MAX_INTERATIONS = 100;
  let currentIter = 0;

  // here we will simply click the See more button until all of the cards are loaded
  while (currentIter < MAX_INTERATIONS) {
    try {
      const [btnActionRes] = await shPage.observe({
        instruction: `Click the "See more" button at the bottom of the page if it exists. 
        If it does not exist do nothing. 
        Do NOT click any other button. 
        Do NOT navigate to any other site page.
        Stay on the oracle.com/customers page at all times.`
      });
      await shPage.waitForTimeout(1000);

      if (!btnActionRes) break;

      await shPage.act(btnActionRes);
      await shPage.waitForTimeout(1000);
    } catch (error) {
      console.log('Failed to click see more button.', error.message);

      const { hasSeeMoreButton } = await shPage.extract({
        instruction: 'Check if the "See more" button exists at the bottom of the page, scrolling down as needed.',
        schema: z.object({
          hasSeeMoreButton: z.boolean().describe('true if the "See more" button at the bottom of the page. false if not.'),
        }),
      });

      if (!hasSeeMoreButton) {
        break;
      }
    }

    currentIter++;
  }

  const roughCustomerCardCount = CARDS_PER_PAGE * currentIter;

  await shPage.waitForTimeout(1000);

  const cardSchema = z.object({
    customerCards: z.array(
      z.object({
        customerName: z.string().describe("The name of the customer extracted from the heading."),
        heading: z.string().describe("The heading summary on the customer card."),
        industry: z.string().describe("The customer industry on the card."),
        location: z.string().describe("The customer location on the card."),
        button: z.object({
          label: z.string().describe('The button label. Usually "Read more" or something similar.'),
          url: z.string().describe("The full href url to the button."),
        }).describe("The action button on the customer card."),
      }),
    ),
  });

  type CustomerCards = z.infer<typeof cardSchema>['customerCards'];

  const allCustomerCards: CustomerCards = [];

  let cardpageI = 0;

  // Now extract all of the info from the cards. This seems to work from the bottom up.
  // NOTE: sometimes the scrolling doesn't seem to work very well and captures the same cards multiple times, and may not end will every card captured.
  while (cardpageI <= MAX_INTERATIONS) {
    const { customerCards } = await shPage.extract({
      instruction:
        `Extract the information from all of the customer cards on the page, scrolling the page as necessary. 
        You know you reached the bottom by having a visible site footer and you know you reached the top by a visible filters above the customer cards.`,
      schema: cardSchema,
      useTextExtract: false, // Set this to true if you want to extract longer paragraphs
    });

    const newCards = customerCards.filter(card => allCustomerCards.findIndex(existingCard => card.customerName === existingCard.customerName) === -1);

    if (newCards.length) {
      allCustomerCards.push(...newCards);
    }

    // If the count of extracted customer cards are within the margin of one page size, exit the loop.
    const topMargin = roughCustomerCardCount + CARDS_PER_PAGE;
    const bottomMargin = roughCustomerCardCount - CARDS_PER_PAGE > 0 ? roughCustomerCardCount - CARDS_PER_PAGE : 0;
    if (allCustomerCards.length >= bottomMargin && allCustomerCards.length <= topMargin) {
      break;
    }

    cardpageI++;
  }

  console.log(JSON.stringify(allCustomerCards, null, "\t"));
  console.log(`Extracted ${allCustomerCards.length} customers total.`);

  await shPage.waitForTimeout(5000);

  console.log('Navigating on original page...');
  await page.goto("https://www.example.com/", { waitUntil: "load" });
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
