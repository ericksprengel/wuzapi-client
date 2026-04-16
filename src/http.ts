import type { WuzapiConfig } from "./config";

export class WuzapiHttpError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly body: unknown,
  ) {
    super(message);
    this.name = "WuzapiHttpError";
  }
}

export class WuzapiNetworkError extends Error {
  constructor(message: string, cause: unknown) {
    super(message, { cause });
    this.name = "WuzapiNetworkError";
  }
}

export class WuzapiJsonError extends Error {
  constructor(message: string, cause: unknown) {
    super(message, { cause });
    this.name = "WuzapiJsonError";
  }
}

export function createWuzapiRequest(config: WuzapiConfig) {
  const defaultHeaders = {
    "Content-Type": "application/json",
    Token: config.token,
  };

  const post = async <T>(path: string, body: unknown): Promise<T> => {
    const url = `${config.baseUrl}${path}`;

    let res: Response;
    try {
      res = await fetch(url, {
        method: "POST",
        headers: defaultHeaders,
        body: JSON.stringify(body),
      });
    } catch (error) {
      throw new WuzapiNetworkError(`[wuzapi] POST ${url} failed`, error);
    }

    let resBody: unknown;
    try {
      resBody = await res.json();
    } catch (error) {
      throw new WuzapiJsonError(
        `[wuzapi] Failed to parse response body for ${res.url}`,
        error,
      );
    }

    if (!res.ok) {
      throw new WuzapiHttpError(
        `[wuzapi] POST ${url} [${res.status}]`,
        res.status,
        resBody,
      );
    }

    return resBody as T;
  };

  const get = async <T>(path: string): Promise<T> => {
    const url = `${config.baseUrl}${path}`;

    let res: Response;
    try {
      res = await fetch(url, { headers: defaultHeaders });
    } catch (error) {
      throw new WuzapiNetworkError(`[wuzapi] GET ${url} failed`, error);
    }

    let resBody: unknown;
    try {
      resBody = await res.json();
    } catch (error) {
      throw new WuzapiJsonError(
        `[wuzapi] Failed to parse response body for ${res.url}`,
        error,
      );
    }

    if (!res.ok) {
      throw new WuzapiHttpError(
        `[wuzapi] GET ${url} [${res.status}]`,
        res.status,
        resBody,
      );
    }

    return resBody as T;
  };

  return { get, post };
}
