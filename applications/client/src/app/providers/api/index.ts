import { ApiCore, AxiosAdapter } from '@shared/lib/Instance';

export const api = new ApiCore(import.meta.env.VITE_API_URL, new AxiosAdapter());
