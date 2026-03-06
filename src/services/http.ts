export interface RequestConfig {
  url: string;
  data?: Record<string, unknown>;
  method?: "GET" | "POST";
}

export type Requester = (config: RequestConfig) => Promise<unknown>;

interface UniRequestResult {
  statusCode?: number;
  data?: unknown;
}

function unwrapResult(result: unknown): UniRequestResult {
  if (Array.isArray(result)) {
    const [error, response] = result as [unknown, UniRequestResult | undefined];
    if (error) {
      throw error;
    }
    return response ?? {};
  }

  return (result as UniRequestResult) ?? {};
}

export const uniRequester: Requester = async (config) => {
  const response = await uni.request({
    url: config.url,
    data: config.data,
    method: config.method ?? "GET"
  });

  const normalized = unwrapResult(response);

  if (!normalized.statusCode || normalized.statusCode >= 400) {
    throw new Error(`Request failed with status ${normalized.statusCode ?? "unknown"}`);
  }

  return normalized.data;
};
