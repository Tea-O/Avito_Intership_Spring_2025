import type { HttpAdapter } from '../interfaces';
import type { QueryParams, RequestOptions, Response } from '../types';

export class ApiCore {
  baseURL: string;
  defaultHeaders: Record<string, string>;
  private adapter: HttpAdapter;
  private jwtToken: string | null = null;
  private refreshTokenValue: string | null = null;

  constructor(baseURL: string, adapter: HttpAdapter) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
    this.adapter = adapter;
  }

  host = (newBaseURL: string) => ((this.baseURL = newBaseURL), this);

  private createQueryString(params: QueryParams): string {
    return new URLSearchParams(params as Record<string, string>).toString();
  }

  private buildHeaders(headers: Record<string, string> = {}): Record<string, string> {
    return {
      ...this.defaultHeaders,
      ...headers,
      ...(this.jwtToken ? { Authorization: `Bearer ${this.jwtToken}` } : {}),
    };
  }

  private async handleRequest<T, B>(
    endpoint: string,
    options: RequestOptions<B>,
    retry: boolean,
  ): Promise<Response<T>> {
    try {
      return await this.adapter.request<T, B>(endpoint, options);
    } catch (error) {
      if (retry && error instanceof Error && (error as any).status === 401) {
        return this.handleRequest<T, B>(endpoint, { ...options, headers: this.buildHeaders(options.headers) }, false);
      }
      throw error;
    }
  }

  async request<T, B = unknown>(
    endpoint: string,
    options: RequestOptions<B> = {},
    retry: boolean = true,
  ): Promise<Response<T>> {
    const { queryParams, headers, ...restOptions } = options;
    const queryString = queryParams ? `?${this.createQueryString(queryParams)}` : '';
    const url = `${this.baseURL}${endpoint}${queryString}`;
    const finalOptions: RequestOptions<B> = {
      ...restOptions,
      headers: this.buildHeaders(headers),
    };

    return this.handleRequest<T, B>(url, finalOptions, retry);
  }

  get<T>(endpoint: string, options: RequestOptions = {}): Promise<Response<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  post<T, B = unknown>(endpoint: string, body: B, options: RequestOptions<B> = {}): Promise<Response<T>> {
    return this.request<T, B>(endpoint, { ...options, method: 'POST', body });
  }

  patch<T, B = unknown>(endpoint: string, body: B, options: RequestOptions<B> = {}): Promise<Response<T>> {
    return this.request<T, B>(endpoint, { ...options, method: 'PATCH', body });
  }

  put<T, B = unknown>(endpoint: string, body: B, options: RequestOptions<B> = {}): Promise<Response<T>> {
    return this.request<T, B>(endpoint, { ...options, method: 'PUT', body });
  }

  delete<T>(endpoint: string, options: RequestOptions = {}): Promise<Response<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}
