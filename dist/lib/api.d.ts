import { z } from "zod";
import { StagehandAPIConstructorParams, StartSessionParams, StartSessionResult } from "../types/api";
import { GotoOptions } from "../types/playwright";
import { ActOptions, ActResult, AgentConfig, ExtractOptions, ExtractResult, ObserveOptions, ObserveResult } from "../types/stagehand";
import { AgentExecuteOptions, AgentResult } from ".";
export declare class StagehandAPI {
    private apiKey;
    private projectId;
    private sessionId?;
    private logger;
    constructor({ apiKey, projectId, logger }: StagehandAPIConstructorParams);
    init({ modelName, modelApiKey, domSettleTimeoutMs, verbose, debugDom, systemPrompt, selfHeal, waitForCaptchaSolves, actionTimeoutMs, browserbaseSessionCreateParams, }: StartSessionParams): Promise<StartSessionResult>;
    act(options: ActOptions): Promise<ActResult>;
    extract<T extends z.AnyZodObject>(options: ExtractOptions<T>): Promise<ExtractResult<T>>;
    observe(options?: ObserveOptions): Promise<ObserveResult[]>;
    goto(url: string, options?: GotoOptions): Promise<void>;
    agentExecute(agentConfig: AgentConfig, executeOptions: AgentExecuteOptions): Promise<AgentResult>;
    end(): Promise<Response>;
    private execute;
    private request;
}
