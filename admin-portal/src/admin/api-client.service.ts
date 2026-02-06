import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class ApiClientService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.CORE_BACKEND_URL || 'http://backend:3000',
    });
  }

  setToken(token: string) {
    this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  async login(email: string, password: string): Promise<string> {
    const res = await this.client.post('/auth/login', { email, password });
    return res.data.access_token;
  }

  async get(path: string) {
    return (await this.client.get(path)).data;
  }

  async post(path: string, body: any) {
    return (await this.client.post(path, body)).data;
  }

  async put(path: string, body: any) {
    return (await this.client.put(path, body)).data;
  }

  async delete(path: string) {
    return (await this.client.delete(path)).data;
  }
}
