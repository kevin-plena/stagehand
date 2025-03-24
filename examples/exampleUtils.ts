import test, { Browser, chromium, Page as PlaywrightPage } from "@playwright/test";
import path from "path";
import fs from "fs";
import os from "os";
import { LocalBrowserLaunchOptions } from "@/types/stagehand";
import OpenAI, { ClientOptions } from "openai";
import { ChatCompletionCreateParamsNonStreaming } from "openai/resources/chat";

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

export const remoteClientHandler = async (clientOptions: ClientOptions, body: ChatCompletionCreateParamsNonStreaming) => {
  // For making OpenAI API requests to a backend server.
  // For now, we will simply use the client here in this example.
  const client = new OpenAI({
    ...clientOptions,
    apiKey: process.env.DETACHED_API_KEY
  });

  const response = await client.chat.completions.create(body);

  return response;
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
  if (!test) {
    console.log('No test object found, returning null');
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