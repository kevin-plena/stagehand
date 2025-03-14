import { ClientOptions } from "openai";
import { LogLine } from "../../types/log";
import { AvailableModel } from "../../types/model";
import { LLMCache } from "../cache/LLMCache";
import { CreateChatCompletionOptions, LLMClient, LLMResponse } from "./LLMClient";
import type { RemoteClientHandler } from "@/types/stagehand";
export declare class OpenAIClient extends LLMClient {
    type: "openai";
    private client;
    private cache;
    private enableCaching;
    clientOptions: ClientOptions;
    private remoteClientHandler?;
    constructor({ enableCaching, cache, modelName, clientOptions, remoteClientHandler }: {
        logger: (message: LogLine) => void;
        enableCaching?: boolean;
        cache?: LLMCache;
        modelName: AvailableModel;
        clientOptions?: ClientOptions;
        remoteClientHandler?: RemoteClientHandler;
    });
    createChatCompletion<T = LLMResponse>({ options: optionsInitial, logger, retries, }: CreateChatCompletionOptions): Promise<T>;
}
