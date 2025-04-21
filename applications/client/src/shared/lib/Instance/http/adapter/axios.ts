import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { HTTP_CODE } from '../../constants';
import { HttpError } from '../../error';
import type { HttpAdapter } from '../../interfaces';
import type { RequestOptions, Response } from '../../types';

export class AxiosAdapter implements HttpAdapter {
  async request<T, B = unknown>(url: string, options: RequestOptions<B> = {}): Promise<Response<T>> {
    const { method = 'GET', headers, body, signal } = options;

    const axiosConfig: AxiosRequestConfig = {
      url,
      method,
      headers,
      data: body,
      signal,
    };

    try {
      const response: AxiosResponse<T> = await axios(axiosConfig);

      return {
        data: response.data,
        status: response.status,
      };
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status ?? HTTP_CODE.UNKNOWN.code;
        const data = err.response?.data;
        const message = err.message;

        throw new HttpError(message, status, data);
      } else {
        throw err;
      }
    }
  }

  createAbortController(): AbortController {
    return new AbortController();
  }
}
