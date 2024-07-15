import axios, { AxiosInstance, AxiosResponse } from 'axios';

interface RequestOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  ciSession?: string; // Optional ci_session cookie value
}

export class ApiService {
  private static api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  static async get(
    endpoint: string,
    params: Record<string, any> = {},
    options: RequestOptions = {},
  ): Promise<any> {
    try {
      this.setCiSessionCookie(options.ciSession);
      const response: AxiosResponse = await this.api.get(endpoint, { params });
      if (options.onSuccess) options.onSuccess(response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, options.onError);
    }
  }

  static async post(
    endpoint: string,
    data: any,
    options: RequestOptions = {},
  ): Promise<any> {
    try {
      this.setCiSessionCookie(options.ciSession);
      const response: AxiosResponse = await this.api.post(endpoint, data);
      if (options.onSuccess) options.onSuccess(response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, options.onError);
    }
  }

  static async put(
    endpoint: string,
    data: any,
    options: RequestOptions = {},
  ): Promise<any> {
    try {
      this.setCiSessionCookie(options.ciSession);
      const response: AxiosResponse = await this.api.put(endpoint, data);
      if (options.onSuccess) options.onSuccess(response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, options.onError);
    }
  }

  static async delete(
    endpoint: string,
    options: RequestOptions = {},
  ): Promise<any> {
    try {
      this.setCiSessionCookie(options.ciSession);
      const response: AxiosResponse = await this.api.delete(endpoint);
      if (options.onSuccess) options.onSuccess(response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, options.onError);
    }
  }

  private static setCiSessionCookie(ciSession?: string): void {
    if (ciSession) {
      this.api.defaults.headers.common['Cookie'] = `ci_session=${ciSession}`;
    }
  }

  private static handleError(error: any, onError?: (error: any) => void): void {
    console.error('API Error:', error, error.config.url);
    if (onError) onError(error);
    throw error;
  }
}
