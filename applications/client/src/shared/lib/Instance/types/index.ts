export type RequestOptions<B = unknown> = {
  method?: string;
  headers?: Record<string, string>;
  body?: B;
  signal?: AbortSignal;
  queryParams?: QueryParams;
};

export type QueryParams = Record<string, string | number | boolean>;

export type Response<T> = {
  data: T;
  status: number;
};

export type HttpStatusCode = {
  code: number;
  message: string;
};

export type HttpStatus = {
  UNKNOWN: HttpStatusCode;
  SUCCESS: {
    OK: HttpStatusCode;
    CREATED: HttpStatusCode;
  };
  CLIENT_ERROR: {
    BAD_REQUEST: HttpStatusCode;
    UNAUTHORIZED: HttpStatusCode;
    FORBIDDEN: HttpStatusCode;
    NOT_FOUND: HttpStatusCode;
  };
  SERVER_ERROR: {
    INTERNAL_SERVER_ERROR: HttpStatusCode;
    NOT_IMPLEMENTED: HttpStatusCode;
    BAD_GATEWAY: HttpStatusCode;
    SERVICE_UNAVAILABLE: HttpStatusCode;
  };
};
