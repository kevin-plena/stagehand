import { LogLine } from "@/types/log";
import { AgentClient } from "./AgentClient";
import { AgentType, RemoteAgentClientHandler } from "@/types/agent";
import { OpenAICUAClient } from "./OpenAICUAClient";
import { AnthropicCUAClient } from "./AnthropicCUAClient";

// Map model names to their provider types
const modelToAgentProviderMap: Record<string, AgentType> = {
  "computer-use-preview-2025-02-04": "openai",
  "computer-use-preview-2025-03-11": "openai",
  "claude-3-5-sonnet-20240620": "anthropic",
  "claude-3-5-sonnet-20241022": "anthropic",
  "claude-3-7-sonnet-20250219": "anthropic", // Add newer Claude models
};

/**
 * Provider for agent clients
 * This class is responsible for creating the appropriate agent client
 * based on the provider type
 */
export class AgentProvider {
  private logger: (message: LogLine) => void;

  /**
   * Create a new agent provider
   */
  constructor(logger: (message: LogLine) => void) {
    this.logger = logger;
  }

  getClient(
    modelName: string,
    clientOptions?: Record<string, unknown>,
    userProvidedInstructions?: string,
    remoteAgentClientHandler?: RemoteAgentClientHandler
  ): AgentClient {
    const type = AgentProvider.getAgentProvider(modelName);
    this.logger({
      category: "agent",
      message: `Getting agent client for type: ${type}, model: ${modelName}`,
      level: 2,
    });

    try {
      switch (type) {
        case "openai":
          return new OpenAICUAClient(
            type,
            modelName,
            userProvidedInstructions,
            clientOptions,
            remoteAgentClientHandler
          );
        case "anthropic":
          return new AnthropicCUAClient(
            type,
            modelName,
            userProvidedInstructions,
            clientOptions,
            remoteAgentClientHandler
          );
        default:
          throw new Error(`Unknown agent type: ${type}`);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.logger({
        category: "agent",
        message: `Error creating agent client: ${errorMessage}`,
        level: 0,
      });
      throw error;
    }
  }

  static getAgentProvider(modelName: string): AgentType {
    // First check the exact model name in the map
    if (modelName in modelToAgentProviderMap) {
      return modelToAgentProviderMap[modelName];
    }

    // Default to OpenAI CUA for unrecognized models with warning
    throw new Error(`Unknown model name: ${modelName}`);
  }
}
