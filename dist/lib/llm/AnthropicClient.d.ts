import { ClientOptions } from "@anthropic-ai/sdk";
import { LogLine } from "../../types/log";
import { AvailableModel } from "../../types/model";
import { LLMCache } from "../cache/LLMCache";
import { CreateChatCompletionOptions, LLMClient, LLMResponse } from "./LLMClient";
import type { RemoteClientHandler } from "@/types/stagehand";
export declare class AnthropicClient extends LLMClient {
    type: "anthropic";
    private client;
    private cache;
    private enableCaching;
    clientOptions: ClientOptions;
    private remoteClientHandler?;
    constructor({ enableCaching, cache, modelName, clientOptions, userProvidedInstructions, remoteClientHandler }: {
        logger: (message: LogLine) => void;
        enableCaching?: boolean;
        cache?: LLMCache;
        modelName: AvailableModel;
        clientOptions?: ClientOptions;
        userProvidedInstructions?: string;
        remoteClientHandler?: RemoteClientHandler;
    });
    createChatCompletion<T = LLMResponse>({ options, retries, logger, }: CreateChatCompletionOptions): Promise<T>;
}
