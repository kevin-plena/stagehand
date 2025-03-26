import { LogLine } from "@/types/log";
import { AgentClient } from "./AgentClient";
import { AgentType, RemoteAgentClientHandler } from "@/types/agent";
/**
 * Provider for agent clients
 * This class is responsible for creating the appropriate agent client
 * based on the provider type
 */
export declare class AgentProvider {
    private logger;
    /**
     * Create a new agent provider
     */
    constructor(logger: (message: LogLine) => void);
    getClient(modelName: string, clientOptions?: Record<string, unknown>, userProvidedInstructions?: string, remoteAgentClientHandler?: RemoteAgentClientHandler): AgentClient;
    static getAgentProvider(modelName: string): AgentType;
}
