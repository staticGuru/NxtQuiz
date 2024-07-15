export interface GenerateOptions {
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  responseFormat?: 'json_object' | 'text';
}

export interface PromptMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ModelInfo {
  name: string;
  version: string;
  capabilities: string[];
}

export abstract class LlmAdapter {
  abstract generateText(
    prompt: PromptMessage[],
    options?: GenerateOptions,
    modelVersion?: string,
  ): Promise<string>;

  abstract toJson<T>(response: string): T | null;
}

export enum OpenAiModel {
  GPT3 = 'gpt-3.5-turbo',
  GPT4O = 'gpt-4o',
  GPT4_TURBO = 'gpt-4-turbo',
}
