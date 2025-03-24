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
import { getContextPath, initCdpBrowser, setPageViewportSize, extractJson } from "./exampleUtils";


const dataSchema = z.object({
  businessEntities: z.array(
    z.object({
      entityInformation: z.object({
        entityName: z.string(),
        entityNumber: z.string(),
        entityType: z.string(),
        entitySubtype: z.string(),
        formationDate: z.date(),
        profession: z.string(),
        formationEffectiveDate: z.date(),
        entityStatus: z.string(),
        renewByDate: z.date(),
        entityStatusDetails: z.string(),
        lastRenewedDate: z.date(),
        statusUpdatedOn: z.date(),
        expirationDate: z.date(),
      }),
      registeredAgent: z.object({
        name: z.string(),
        registeredAgentType: z.string(),
        streetAddress: z.string(),
        lastUpdated: z.date(),
      }),
      principalInformation: z.array(
        z.object({
          title: z.string(),
          name: z.string(),
          address: z.string(),
          lastUpdated: z.date(),
        }),
      ),
      addressInformation: z.object({
        physicalAddress: z.string(),
        physicalAddressUpdatedDate: z.string(),
        mailingAddress: z.string(),
        mailingAddressUpdatedDate: z.string(),
      }),
      serviceOfProcessInformation: z.object({
        serviceOfProcessName: z.string(),
        lastUpdated: z.date(),
        serviceOfProcessAddress: z.string(),
      }),
    }),
  ),
});

type BusinessEntities = z.infer<typeof dataSchema>;
// type BusinessEntity = z.infer<typeof dataSchema>['businessEntities'];


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

  await shPage.goto(
    "https://businessregistration.utah.gov/EntitySearch/OnlineEntitySearch",
    { waitUntil: "load" },
  );
  // Refresh the page once to ensure it is properly loaded
  await shPage.reload({ waitUntil: "load" });
  await shPage.waitForTimeout(1000);

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

  const parsedSchema = JSON.stringify(zodToJsonSchema(dataSchema));

  const company = {
    name: 'Motivosity',
    address: '1633 W Innovation Way Suite 150, Lehi, UT 84043',
    website: 'https://www.motivosity.com'
  }

  // Execute the agent again with a different instruction
  const firstInstruction = `
  Search and extract the business entity information for the company: 
  ${JSON.stringify(company)}

  When navigating to the entity result, make sure to click directly on the text of the entity name.

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
    maxSteps: 12,
  });

  console.log(`${chalk.green("✓")} Execution complete`);
  console.log(`${chalk.yellow("⤷")} Result:`);
  // console.log(chalk.white(JSON.stringify(result1, null, 2)));
  fs.writeFileSync("./tmp/utahResult1.json", JSON.stringify(result1, null, 2));
  // console.log(`Extracted ${allCustomerCards.length} customers total.`);
}

async function parseOutput() {
  const data = JSON.parse(fs.readFileSync("./tmp/utahResult1.json", "utf8"));
  const parsedData = await extractJson(data?.message) as BusinessEntities;
  console.log(parsedData);
}

(async () => {
  await parseOutput();
  // await agentExample();
})();
