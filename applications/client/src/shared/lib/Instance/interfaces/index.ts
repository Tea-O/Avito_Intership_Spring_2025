import type { RequestOptions, Response } from '../types';

export interface HttpAdapter {
  request<T, B = unknown>(url: string, options: RequestOptions<B>): Promise<Response<T>>;
  createAbortController?(): any;
}
