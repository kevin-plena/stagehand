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
import fs from "fs";
import { z } from "zod";
import chalk from "chalk";
import { zodToJsonSchema } from "zod-to-json-schema";
import { getContextPath, initCdpBrowser, setPageViewportSize } from "./exampleUtils";


const cardSchema = z.object({
  customerCards: z.array(
    z.object({
      customerName: z.string().describe("The name of the customer extracted from the heading."),
      heading: z.string().describe("The heading summary on the customer card."),
      industry: z.string().describe("The customer industry on the card."),
      location: z.string().describe("The customer location on the card."),
      button: z.object({
        label: z.string().describe('The button label. Usually "Read more" or something similar.'),
        url: z.string().url().describe("The full href url to the button."),
      }).describe("The action button on the customer card."),
    }),
  ),
});

type CustomerCards = z.infer<typeof cardSchema>['customerCards'];


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
    // remoteClientHandler
  });
  await stagehand.init();

  const shPage = stagehand.page;

  // https://www.oracle.com/customers/?product=mpd-cld-apps:fusion-suite:hcm~mpd-cld-apps:fusion-suite:erp
  await shPage.goto(
    // "https://www.oracle.com/customers/?product=mpd-cld-apps:fusion-suite:hcm~mpd-cld-apps:fusion-suite:erp&region=rgn-n",
    "https://www.oracle.com/customers/?product=mpd-cld-apps:fusion-suite:hcm~mpd-cld-apps:fusion-suite:erp&region=rgn-j",
    { waitUntil: "load" },
  );
  await shPage.waitForTimeout(1000);

  const CARDS_PER_PAGE = 18;
  const MAX_ITERATIONS = 100;
  let currentIter = 0;

  // here we will simply click the See more button until all of the cards are loaded
  while (currentIter < MAX_ITERATIONS) {
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

  // Jump to the bottom of the page
  await shPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  const roughCustomerCardCount = CARDS_PER_PAGE * currentIter;

  await shPage.waitForTimeout(1000);

  const allCustomerCards: CustomerCards = [];

  let cardpageI = 0;

  // Now extract all of the info from the cards. This seems to work from the bottom up.
  // NOTE: sometimes the scrolling doesn't seem to work very well and captures the same cards multiple times, and may not end with every card captured.
  while (cardpageI <= MAX_ITERATIONS) {
    const { customerCards } = await shPage.extract({
      instruction:
        `Extract the information from all of the customer cards on the page, scrolling the page as necessary. 
        You know you reached the bottom by having a visible site footer and you know you reached the top by a visible filters above the customer cards.`,
      schema: cardSchema,
      useTextExtract: false, // Set this to true if you want to extract longer paragraphs
    });

    const newCards = customerCards.filter(card => allCustomerCards.findIndex(existingCard => card.button.url === existingCard.button.url) === -1);

    if (newCards.length) {
      allCustomerCards.push(...newCards);
    }

    // If the count of extracted customer cards are within the margin of one page size, exit the loop.
    const topMargin = roughCustomerCardCount + CARDS_PER_PAGE;
    const bottomMargin = roughCustomerCardCount - CARDS_PER_PAGE > 0 ? roughCustomerCardCount - CARDS_PER_PAGE : 0;
    if (allCustomerCards.length >= bottomMargin && allCustomerCards.length <= topMargin && !newCards.length) {
      break;
    }

    cardpageI++;
  }

  fs.writeFileSync("customerCards.json", JSON.stringify(allCustomerCards, null, 2));
  console.log(`Extracted ${allCustomerCards.length} customers total.`);

  await shPage.waitForTimeout(5000);

  console.log('Navigating on original page...');
  await page.goto("https://www.example.com/", { waitUntil: "load" });
}

export async function example2() {
  // const { context } = await initCdpBrowser();
  // const contextPath = getContextPath(StagehandConfig.localBrowserLaunchOptions);

  // const page = await context.newPage();

  console.time('example2');

  const stagehand = new Stagehand({
    ...StagehandConfig,
    // browserContext: {
    //   context,
    //   contextPath,
    //   // createNewPage: true,
    //   page,
    // },
    // remoteClientHandler
  });
  await stagehand.init();

  const shPage = stagehand.page;

  setPageViewportSize(shPage);

  // https://www.oracle.com/customers/?product=mpd-cld-apps:fusion-suite:hcm~mpd-cld-apps:fusion-suite:erp
  await shPage.goto(
    // "https://www.oracle.com/customers/?product=mpd-cld-apps:fusion-suite:hcm~mpd-cld-apps:fusion-suite:erp&region=rgn-n",
    "https://www.oracle.com/customers/?product=mpd-cld-apps:fusion-suite:hcm~mpd-cld-apps:fusion-suite:erp&region=rgn-j",
    { waitUntil: "load" },
  );
  await shPage.waitForTimeout(1000);

  const MAX_ITERATIONS = 100;
  let currentIter = 0;

  // here we will simply click the See more button until all of the cards are loaded
  while (currentIter < MAX_ITERATIONS) {
    try {
      const [btnActionRes] = await shPage.observe({
        instruction: `Click the link at the bottom of the page labeled "See more", if it exists, to load more customers.`
      });
      await shPage.waitForTimeout(1000);

      if (!btnActionRes) break;

      await shPage.act(btnActionRes);
      await shPage.waitForTimeout(1000);
      currentIter++;

      const { hasSeeMoreButton } = await shPage.extract({
        instruction: 'Check if the "See more" link exists at the bottom of the page, scrolling down as needed.',
        schema: z.object({
          hasSeeMoreButton: z.boolean().describe('true if the "See more" button at the bottom of the page. false if not.'),
        }),
      });

      if (!hasSeeMoreButton) {
        break;
      }
    } catch (error) {
      console.log('Failed to click see more button.', error.message);
    }
  }

  await shPage.waitForTimeout(1000);

  const { customerCards } = await shPage.extract({
    instruction:
      `Extract the information from all of the customer cards on the page, scrolling the page as necessary. 
      You know you reached the bottom by having a visible site footer and you know you reached the top by a visible filters above the customer cards.`,
    schema: cardSchema,
    useTextExtract: false, // Set this to true if you want to extract longer paragraphs
  });

  console.timeEnd('example2');

  console.log(`Extracted ${customerCards.length} customers total.`);

  fs.writeFileSync("./tmp/customerCards.json", JSON.stringify(customerCards, null, 2));
  fs.writeFileSync("./tmp/customerCardsMetrics.json", JSON.stringify(stagehand.metrics, null, 2));

  await shPage.waitForTimeout(5000);

  // console.log('Navigating on original page...');
  // await page.goto("https://www.example.com/", { waitUntil: "load" });
}

export async function agentExample() {
  const { context } = await initCdpBrowser();
  const contextPath = getContextPath(StagehandConfig.localBrowserLaunchOptions);

  const page = await context.newPage();

  setPageViewportSize(page);

  const stagehand = new Stagehand({
    ...StagehandConfig,
    browserContext: {
      context,
      contextPath,
      // createNewPage: true,
      page,
    },
    // remoteClientHandler
  });
  await stagehand.init();

  const shPage = stagehand.page;

  // https://www.oracle.com/customers/?product=mpd-cld-apps:fusion-suite:hcm~mpd-cld-apps:fusion-suite:erp
  await shPage.goto(
    // "https://www.oracle.com/customers/?product=mpd-cld-apps:fusion-suite:hcm~mpd-cld-apps:fusion-suite:erp&region=rgn-n",
    "https://www.oracle.com/customers/?product=mpd-cld-apps:fusion-suite:hcm~mpd-cld-apps:fusion-suite:erp&region=rgn-j",
    { waitUntil: "load" },
  );
  await shPage.waitForTimeout(1000);

  // Remove the chatbotLoc element from the page
  const chatbotLoc = shPage.locator('ocom-chatbot');
  await chatbotLoc.evaluate((elem) => {
    // const elem = document.querySelector('ocom-chatbot');
    if (elem) {
      elem.remove();
    }
  });
  // Remove the filter section element from the page
  const filterSectionLoc = shPage.locator('section#filter-section');
  await filterSectionLoc.evaluate((elem) => {
    if (elem) {
      elem.remove();
    }
  });

  const agent = stagehand.agent({
    // provider: "openai",
    // model: "computer-use-preview-2025-02-04",
    provider: "anthropic",
    model: "claude-3-7-sonnet-20250219",
    // model: "claude-3-5-sonnet-20240620",
    // model: "claude-3-5-sonnet-20241022",
    instructions: `You are a helpful assistant that can use a web browser.
    You are currently on the following page: ${page.url()}.
    Do not ask follow up questions, the user will trust your judgement.`,
    options: {
      // apiKey: process.env.OPENAI_API_KEY,
      apiKey: process.env.ANTHROPIC_API_KEY,
    },
  });

  const parsedSchema = JSON.stringify(zodToJsonSchema(cardSchema));

  // Click the X button to close the "Chat now" popup if it appears and is obstructing the view.

  // Execute the agent again with a different instruction
  const firstInstruction = `
  Extract the information from all of the customer cards on the page, scrolling down the page.
  Only scroll the page once and extract the information as you go down.
  The filters have already been applied to show the correct customers.
  Do not navigate to any other page or click any buttons. You should be on the oracle.com/customers page at all times.

  Once the bottom is reached, stop the execution.

  Respond in this zod schema format:\n${parsedSchema}\n

  Do not include any other text, formatting or markdown in your output. Do not include \`\`\` or \`\`\`json in your response. Only the JSON object itself.
  `;
  console.log(
    `${chalk.cyan("↳")} Instruction: ${chalk.white(firstInstruction)}`,
  );

  const result1 = await agent.execute({
    instruction: firstInstruction,
    waitBetweenActions: 60000,
    waitBetweenSteps: 40000,
    maxSteps: 11,
  });

  console.log(`${chalk.green("✓")} Execution complete`);
  console.log(`${chalk.yellow("⤷")} Result:`);
  // console.log(chalk.white(JSON.stringify(result1, null, 2)));
  fs.writeFileSync("./tmp/result1.json", JSON.stringify(result1, null, 2));
  // console.log(`Extracted ${allCustomerCards.length} customers total.`);


  const instruction2 = `
  Continue extracting the information from all of the customer cards on the page, scrolling down the page.
  Only scroll the page once and extract the information as you go down.
  The filters have already been applied to show the correct customers.
  Assume the first visible customer cards have already been extracted.

  If the "See more" button exists at the bottom of the page, click it to load in more customers.
  Do not navigate to any other page or click any other buttons. You should be on the oracle.com/customers page at all times.
  Once the bottom is reached, stop the execution.

  Respond in this zod schema format:\n${parsedSchema}\n

  Do not include any other text, formatting or markdown in your output. Do not include \`\`\` or \`\`\`json in your response. Only the JSON object itself.
  `;
  console.log(
    `${chalk.cyan("↳")} Instruction: ${chalk.white(instruction2)}`,
  );

  const result2 = await agent.execute({
    instruction: instruction2,
    waitBetweenActions: 60000,
    waitBetweenSteps: 40000,
    maxSteps: 11,
  });

  console.log(`${chalk.green("✓")} Execution complete`);
  console.log(`${chalk.yellow("⤷")} Result2:`);
  fs.writeFileSync("./tmp/result2.json", JSON.stringify(result2, null, 2));

  // await shPage.waitForTimeout(5000);

  // console.log('Navigating on original page...');
  // await page.goto("https://www.example.com/", { waitUntil: "load" });
}

(async () => {
  // await example();
  await example2();
  // await agentExample();
})();
