import { AxiosError } from 'axios';

export type ApiError = AxiosError<{
  code?: number;
  message?: string;
}>;
