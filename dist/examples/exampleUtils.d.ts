import { Browser, Page as PlaywrightPage } from "@playwright/test";
import { LocalBrowserLaunchOptions } from "@/types/stagehand";
import OpenAI, { ClientOptions } from "openai";
import { ChatCompletionCreateParamsNonStreaming } from "openai/resources/chat";
import Anthropic from "@anthropic-ai/sdk";
export declare const getContextPath: (localBrowserLaunchOptions: LocalBrowserLaunchOptions) => string;
export declare const initCdpBrowser: () => Promise<{
    browser: Browser;
    context: import("@playwright/test").BrowserContext;
}>;
export declare const remoteClientHandler: (provider: string, providerOptions: {
    clientOptions: ClientOptions;
    body: ChatCompletionCreateParamsNonStreaming;
}) => Promise<(OpenAI.Chat.Completions.ChatCompletion & {
    _request_id?: string | null;
}) | (Anthropic.Messages.Message & {
    _request_id?: string | null;
} & import("@anthropic-ai/sdk/streaming").Stream<Anthropic.Messages.RawMessageStreamEvent>)>;
export declare const remoteAgentClientHandler: <T extends "openai" | "anthropic">(provider: T, providerOptions: {
    clientOptions: ClientOptions;
    body: Record<string, unknown>;
}) => Promise<(import("openai/resources/responses/responses").Response & {
    _request_id?: string | null;
} & import("openai/streaming").Stream<import("openai/resources/responses/responses").ResponseStreamEvent>) | (Anthropic.Beta.Messages.BetaMessage & {
    _request_id?: string | null;
} & import("@anthropic-ai/sdk/streaming").Stream<Anthropic.Beta.Messages.BetaRawMessageStreamEvent>)>;
export declare const setPageViewportSize: (page: PlaywrightPage) => void;
export declare const extractJson: (text: string) => Promise<any>;
export declare const openAiWebSearch: (query: string) => Promise<any>;
export declare const openAiPrompt: (systemMessage: string, query: string) => Promise<any>;
export declare const classifyEntity: (promptVariables: {
    state: string;
    entityData: string;
    registeredName: string;
}) => Promise<any>;
export declare const validateEntity: (promptVariables: {
    state: string;
    registrationData: string;
    businessData: string;
}) => Promise<any>;
