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
import { getContextPath, initCdpBrowser, setPageViewportSize, extractJson, classifyEntity, validateEntity } from "./exampleUtils";


const dataSchema = z.object({
  businessEntity: z.object({
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
  })
});

const noResultSchema = z.object({
  searchCriteria: z.object({
    name: z.string(),
  }),
  noResults: z.boolean()
});

type BusinessEntity = z.infer<typeof dataSchema>;
type NoResultResponse = z.infer<typeof noResultSchema>;


export async function agentExample() {
  const { context } = await initCdpBrowser();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const contextPath = getContextPath(StagehandConfig.localBrowserLaunchOptions);

  const page = await context.newPage();

  setPageViewportSize(page);

  console.time('agent-example');

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


  try {
    await shPage.goto(
      "https://businessregistration.utah.gov/EntitySearch/OnlineEntitySearch",
      { waitUntil: "load" },
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // Refresh the page once to ensure it is properly loaded
    await shPage.reload({ waitUntil: "load" });
    await shPage.waitForTimeout(1000);
  }

  const agent = stagehand.agent({
    provider: "anthropic",
    model: "claude-3-7-sonnet-20250219",
    instructions: `You are a helpful assistant that can use a web browser.
    You are currently on the following page: ${page.url()}.
    Do not ask follow up questions, the user will trust your judgement.`,
    options: {
      apiKey: process.env.ANTHROPIC_API_KEY,
    },
    // remoteAgentClientHandler
  });

  const parsedSchema = JSON.stringify(zodToJsonSchema(dataSchema));

  // const company = {
  //   name: 'Motivosity',
  //   address: '1633 W Innovation Way Suite 150, Lehi, UT 84043',
  //   website: 'https://www.motivosity.com'
  // };
  const company = {
    name: 'Tech9',
    address: '2975 Executive Pkwy Ste. 330, Lehi, UT 84043',
    website: 'http://tech9.com/'
  };

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
    // waitBetweenSteps: 40000,
    maxSteps: 12,
  });

  console.timeEnd('agent-example');

  console.log(`${chalk.green("✓")} Execution complete`);
  console.log(`${chalk.yellow("⤷")} Result:`);
  // console.log(chalk.white(JSON.stringify(result1, null, 2)));
  fs.writeFileSync("./tmp/utahResultEx.json", JSON.stringify(result1, null, 2));
  // console.log(`Extracted ${allCustomerCards.length} customers total.`);
}

export async function agentMultiStepExample() {
  const { context } = await initCdpBrowser();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const contextPath = getContextPath(StagehandConfig.localBrowserLaunchOptions);

  const page = await context.newPage();

  setPageViewportSize(page);

  console.time('agent-multistep-example');

  const stagehand = new Stagehand({
    ...StagehandConfig,
    // browserContext: {
    //   context,
    //   contextPath,
    //   page,
    // },
  });
  await stagehand.init();

  // const company = {
  //   name: 'Motivosity',
  //   address: '1633 W Innovation Way Suite 150, Lehi, UT 84043',
  //   website: 'https://www.motivosity.com'
  // };
  const company = {
    name: 'Tech9',
    address: '2975 Executive Pkwy Ste. 330, Lehi, UT 84043',
    website: 'http://tech9.com/',
    category: 'Software company'
  };

  const resultEntity = await runEntitySearch(stagehand, company);

  console.timeEnd('agent-multistep-example');

  console.log('Final result:');
  console.log(JSON.stringify(resultEntity));
}


const runEntitySearch = async (
  stagehand: Stagehand,
  company: {
    name: string;
    address?: string;
    website?: string;
    category?: string;
  },
  depth: number = 0,
  testedEntities: string[] = []
) => {
  const shPage = stagehand.page;

  await shPage.goto(
    "https://businessregistration.utah.gov/EntitySearch/OnlineEntitySearch",
    { waitUntil: "load" },
  );
  await shPage.waitForTimeout(1000);
  // Refresh the page once to ensure it is properly loaded
  await shPage.reload({ waitUntil: "load" });
  await shPage.waitForTimeout(1000);

  const agent = stagehand.agent({
    provider: "anthropic",
    model: "claude-3-7-sonnet-20250219",
    instructions: `You are a helpful assistant that can use a web browser.
    You are currently on the following page: ${shPage.url()}.
    Do not ask follow up questions, the user will trust your judgement.`,
    options: {
      apiKey: process.env.ANTHROPIC_API_KEY,
    }
  });

  const parsedSchema = JSON.stringify(zodToJsonSchema(dataSchema));

  // Execute the agent again with a different instruction
  const firstInstruction = `
  Search and extract the business entity information for the company: 
  ${JSON.stringify(company)}

  If there are no results, return the following schema and quit the execution:
  ${JSON.stringify(zodToJsonSchema(noResultSchema))}

  Else, continue with the following instructions:

  When navigating to the entity result, make sure to click directly on the text of the entity name.

  Do not select an entity if it has already been tested. The tested entity numbers are:
  ${JSON.stringify(testedEntities)}

  Quit the exectuion no matter if a valid result was found or not.

  Respond in this zod schema format:\n${parsedSchema}\n

  Do not include any other text, formatting or markdown in your output. Do not include \`\`\` or \`\`\`json in your response. Only the JSON object itself.
  `;
  console.log(
    `${chalk.cyan("↳")} Instruction: ${chalk.white(firstInstruction)}`,
  );

  const result1 = await agent.execute({
    instruction: firstInstruction,
    waitBetweenActions: 60000,
    // waitBetweenSteps: 40000,
    maxSteps: 10,
  });

  console.log(`${chalk.green("✓")} Execution complete`);
  console.log(`${chalk.yellow("⤷")} Result:`);
  fs.writeFileSync(`./tmp/utahResult${depth}.json`, JSON.stringify(result1, null, 2));

  const result1Json = await extractJson(result1?.message) as BusinessEntity & NoResultResponse;

  if ('noResults' in result1Json && result1Json.noResults === true) {
    console.log('No results found');
    return null;
  }

  // Test for a company in the principal information
  const companyPrincipals = result1Json?.businessEntity?.principalInformation || [];

  let firstDetectedEntity: string | null = null;

  for (const row of companyPrincipals) {
    if (row.name) {
      const classifyRes = await classifyEntity({
        state: 'Utah',
        entityData: JSON.stringify(result1Json?.businessEntity?.entityInformation),
        registeredName: row.name
      });

      console.log(`Classified ${row.name} as ${classifyRes?.label}`);

      if (classifyRes?.label === 'related-entity') {
        firstDetectedEntity = row.name;
        break;
      }
    }
  }

  let entityIsValid = false;

  // Test for if the entity is valid
  if (result1Json) {
    const validateRes = await validateEntity({
      state: 'Utah',
      registrationData: JSON.stringify(result1Json.businessEntity),
      businessData: JSON.stringify(company)
    });

    entityIsValid = validateRes?.is_valid || false;
  }

  // If the entity is valid and there are no related entities, stop the execution
  if (entityIsValid && !firstDetectedEntity) {
    console.log('Entity is valid with no related entities.');
    return result1Json;
  }

  if (firstDetectedEntity) {
    // Search the related entity
    return runEntitySearch(stagehand, {
      name: firstDetectedEntity,
      address: company.address,
    }, depth + 1, testedEntities);
  } else {
    // Continue looking at more results in the search for a valid entity.
    return runEntitySearch(
      stagehand,
      company,
      depth + 1,
      [...testedEntities, result1Json.businessEntity.entityInformation.entityNumber]
    );
  }
};

export async function parseOutput() {
  const data = JSON.parse(fs.readFileSync("./tmp/utahResult1.json", "utf8"));
  const parsedData = await extractJson(data?.message) as BusinessEntity;
  console.log(parsedData);
}

(async () => {
  // await parseOutput();
  await agentExample();
  // await agentMultiStepExample();
})();
