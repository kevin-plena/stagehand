import { EvalFunction } from "@/types/evals";
import { initStagehand } from "@/evals/initStagehand";

export const simple_google_search: EvalFunction = async ({
  modelName,
  logger,
}) => {
  const { stagehand, initResponse } = await initStagehand({
    modelName,
    logger,
  });

  const { debugUrl, sessionUrl } = initResponse;

  await stagehand.page.goto("https://www.google.com");

  await stagehand.page.act({
    action: 'type "OpenAI" into the search bar',
  });

  await stagehand.page.act("click the search button");

  const expectedUrl = "https://www.google.com/search?q=OpenAI";
  const currentUrl = stagehand.page.url();

  await stagehand.close();

  return {
    _success: currentUrl.startsWith(expectedUrl),
    currentUrl,
    debugUrl,
    sessionUrl,
    logs: logger.getLogs(),
  };
};
