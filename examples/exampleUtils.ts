import { Browser, chromium, Page as PlaywrightPage } from "@playwright/test";
import path from "path";
import fs from "fs";
import os from "os";
import { LocalBrowserLaunchOptions } from "@/types/stagehand";
import OpenAI, { ClientOptions } from "openai";
import { ChatCompletionCreateParamsNonStreaming } from "openai/resources/chat";
import Anthropic from "@anthropic-ai/sdk";

export const getContextPath = (
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

export const initCdpBrowser = async () => {
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

export const remoteClientHandler = async (provider: string, providerOptions: {
  clientOptions: ClientOptions;
  body: ChatCompletionCreateParamsNonStreaming;
}) => {
  // For making OpenAI API requests to a backend server.
  // For now, we will simply use the client here in this example.

  if (provider === "openai") {
    const client = new OpenAI({
      ...providerOptions.clientOptions,
      apiKey: process.env.DETACHED_API_KEY
    });

    const response = await client.chat.completions.create(providerOptions.body);

    return response;
  } else if (provider === "anthropic") {
    // Anthropic API request
    const client = new Anthropic(providerOptions.clientOptions);

    // @ts-expect-error - The Anthropic SDK types are stricter than what we need
    const response = await client.messages.create(providerOptions.body);

    return response;
  } else {
    throw new Error(`Unknown provider: ${provider}`);
  }
}

export const remoteAgentClientHandler = async <T extends "openai" | "anthropic">(provider: T, providerOptions: {
  clientOptions: ClientOptions;
  body: Record<string, unknown>;
}) => {
  // For making OpenAI API requests to a backend server.
  // For now, we will simply use the client here in this example.

  if (provider === "openai") {
    const client = new OpenAI({
      ...providerOptions.clientOptions,
      apiKey: process.env.DETACHED_API_KEY
    });

    // @ts-expect-error - Force type to match what the OpenAI SDK expects
    const response = await client.responses.create(providerOptions.body);

    return response;
  } else if (provider === "anthropic") {
    // Anthropic API request
    const client = new Anthropic(providerOptions.clientOptions);

    // @ts-expect-error - The Anthropic SDK types are stricter than what we need
    const response = await client.beta.messages.create(providerOptions.body);

    return response;
  } else {
    throw new Error(`Unknown provider: ${provider}`);
  }
}

export const setPageViewportSize = (page: PlaywrightPage) => {
  try {
    if (page && page.viewportSize()) {
      const { width, height } = page.viewportSize()

      if (width < 1024 || height < 768) {
        page.setViewportSize({ width: 1024, height: 768 });

        console.log('updated small view port of linkedin page context to', page.viewportSize())
      }
    } else if (page) {
      page.setViewportSize({ width: 1024, height: 768 });

      console.log('updated empty view port of linkedin page context to', page.viewportSize())
    }
  } catch (e) {
    console.error(e, 'Error setting viewPort size to page');
  }
}

export const extractJson = async (text: string) => {
  if (!text) {
    console.log('No text object found, returning null');
    return null;
  }

  try {
    const jsonRegex = /{.*}/;
    const match = text.match(jsonRegex);
    if (match) {
      return JSON.parse(match[0]);
    }
  } catch (error) {
    console.log(error, 'Error extracting JSON from text using regex.');
  }

  console.log('Attempting to extract JSON using LLM...');

  try {
    // Use LLM to extract JSON
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Your only goal is to extract the JSON data from the text. Reformat it to valid JSON if necessary. If there is no JSON found in the text, return an empty object: "{}"' },
        { role: 'user', content: text }
      ],
      response_format: {
        type: 'json_object'
      }
    });

    const promptResults = response.choices[0].message.content;

    if (!promptResults) {
      throw new Error(`LLM did not return any results for parsing the JSON.`);
    }

    try {
      return JSON.parse(promptResults);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      throw new Error(`LLM did not return valid json: "${promptResults}"`);
    }
  } catch (error) {
    console.error(error, 'Error extracting JSON from text using LLM');
  }

  return null;
};

export const openAiWebSearch = async (query: string) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.responses.create({
    model: 'gpt-4o-mini',
    input: [
      {
        role: 'user',
        content: [
          {
            type: 'input_text',
            text: query
          }
        ]
      },
    ],
    text: {
      format: {
        // type: 'json_object'
        type: 'text'
      }
    },
    tools: [
      {
        type: 'web_search_preview',
        user_location: {
          type: 'approximate',
          country: 'US'
        },
        search_context_size: 'medium'
      }
    ],
    tool_choice: {
      type: 'web_search_preview'
    },
    temperature: 0.5,
    max_output_tokens: 2048,
    top_p: 1,
    store: false
  });

  const promptResults = response.output_text;

  if (!promptResults) {
    throw new Error(`openAiWebSearch did not return any results.`);
  }

  const parsedResults = await extractJson(promptResults);

  return parsedResults;
};

export const openAiPrompt = async (systemMessage: string, query: string) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: systemMessage
      },
      {
        role: 'user',
        content: query
      }
    ],
    model: 'gpt-4o',
    temperature: 0.5,
    response_format: {
      type: 'json_object'
    }
  });

  const promptResults = response.choices[0].message.content;

  if (!promptResults) {
    throw new Error(`openAiPrompt did not return any results.`);
  }

  const parsedResults = await extractJson(promptResults);

  return parsedResults;
};

export const classifyEntity = async (promptVariables: { state: string; entityData: string; registeredName: string; }) => {
  const prompt = `
  Provided below are the following:
  - State business registration entity information for the state of ${promptVariables.state}
  - Registered name for the entity

  Your job is to verify if the registered name is an individual, from same entity business, or a separate registration service company.
  - Classify the registered name as one of the following labels: "individual", "related-entity", "registration-service".
  - Search the web to find evidence of the registered name being one of the labels. Ensure that the web scrape data has results related to the registered name.
  - If the registered name is the name is incomplete (e.g. "INC"), set the label to "unknown".
  - If the registered name can be clearly interpreted as an individual's name (i.e. it is a common name), there is no need to rely on the web scrape data. Set the label to "individual". 
  - If the web scrape data does not provided sufficient or related data to the registered name and state registration data, and it is an entity that cannot be distinguished from a registration service, set the label to "unknown".

  State Registration Entity Data:  
  ${promptVariables.entityData}

  Entity registered name:  
  ${promptVariables.registeredName}

  Respond in strictly the following json format below and do not include script tags:  

  {
    "registered_name": "{{Registered name for the entity}}",
    "label": "{{Set as one of the above classification labels}}"
  }
  `;

  const result = await openAiWebSearch(prompt);

  return result;
};

export const validateEntity = async (promptVariables: { state: string; registrationData: string; businessData: string; }) => {
  const prompt = `
  Provided below are results for business state registration data, for the state of ${promptVariables.state}.
  Also provided, is the business information used to query for the state registration data.
  Your job is to compare the two sets of data and validate the state registration data to ensure that it accurately matches the business data.

  Validation considerations:
  - Ideally we want an entity with the exact company name, but allow some slack if the company appears to match otherwise.
  - Do not match with holdings companies, subsidiary investment companies, or parent companies.
  - Allow DBA registrations.
  - Aim for an exact address match, but allow for minor differences like building/suite numbers.
  - Attempt to discern if industry/category is a likely match.
  - Use any other details to validate the match as needed.

  State Registration Data:  
  ${promptVariables.registrationData}

  Business Data:  
  ${promptVariables.businessData}


  Respond in strictly the following json format below and do not include script tags:  
  {
    "is_valid": {{true | false}},
    "entity_number": "{{State Registration Entity Number}}"
  }
  `;

  const systemMessage = 'You are an AI assistant that helps identify the correct business entity for a given company.';

  const result = await openAiPrompt(systemMessage, prompt);

  return result;
};