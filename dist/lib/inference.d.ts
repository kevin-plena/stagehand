import { z } from "zod";
import { ActCommandParams, ActCommandResult } from "../types/act";
import { VerifyActCompletionParams } from "../types/inference";
import { LogLine } from "../types/log";
import { LLMClient } from "./llm/LLMClient";
/**
 * Replaces <|VARIABLE|> placeholders in a text with user-provided values.
 */
export declare function fillInVariables(text: string, variables: Record<string, string>): string;
/** Simple usage shape if your LLM returns usage tokens. */
interface LLMUsage {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
}
/**
 * For calls that use a schema: the LLMClient may return { data: T; usage?: LLMUsage }
 */
export interface LLMParsedResponse<T> {
    data: T;
    usage?: LLMUsage;
}
export interface VerifyActCompletionResult {
    completed: boolean;
    prompt_tokens: number;
    completion_tokens: number;
    inference_time_ms: number;
}
export declare function verifyActCompletion({ goal, steps, llmClient, domElements, logger, requestId, logInferenceToFile, }: VerifyActCompletionParams & {
    logInferenceToFile?: boolean;
}): Promise<VerifyActCompletionResult>;
export declare function act({ action, domElements, steps, llmClient, retries, logger, requestId, variables, userProvidedInstructions, onActMetrics, logInferenceToFile, }: ActCommandParams & {
    onActMetrics?: (promptTokens: number, completionTokens: number, inferenceTimeMs: number) => void;
    logInferenceToFile?: boolean;
}): Promise<ActCommandResult | null>;
export declare function extract({ instruction, previouslyExtractedContent, domElements, schema, llmClient, chunksSeen, chunksTotal, requestId, logger, isUsingTextExtract, userProvidedInstructions, logInferenceToFile, }: {
    instruction: string;
    previouslyExtractedContent: object;
    domElements: string;
    schema: z.ZodObject<z.ZodRawShape>;
    llmClient: LLMClient;
    chunksSeen: number;
    chunksTotal: number;
    requestId: string;
    isUsingTextExtract?: boolean;
    userProvidedInstructions?: string;
    logger: (message: LogLine) => void;
    logInferenceToFile?: boolean;
}): Promise<{
    metadata: {
        completed: boolean;
        progress: string;
    };
    prompt_tokens: number;
    completion_tokens: number;
    inference_time_ms: number;
}>;
export declare function observe({ instruction, domElements, llmClient, requestId, isUsingAccessibilityTree, userProvidedInstructions, logger, returnAction, logInferenceToFile, }: {
    instruction: string;
    domElements: string;
    llmClient: LLMClient;
    requestId: string;
    userProvidedInstructions?: string;
    logger: (message: LogLine) => void;
    isUsingAccessibilityTree?: boolean;
    returnAction?: boolean;
    logInferenceToFile?: boolean;
}): Promise<{
    elements: ({
        elementId: number;
        description: string;
    } | {
        method: string;
        arguments: string[];
        elementId: number;
        description: string;
    })[];
    prompt_tokens: number;
    completion_tokens: number;
    inference_time_ms: number;
}>;
export {};
