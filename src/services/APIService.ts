// TODO use .env for developer's local config
import AuthService from './AuthService';

const API_ENDPOINT = 'http://localhost:5000/api';
// const API_ENDPOINT = 'http://34.212.27.73:5000/api';

// const { API_ENDPOINT } = process.env;

class APIService {
  static getHeaders(): HeadersInit {
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      if(AuthService.isLoggedIn()) {
        headers.Authorization = `Bearer ${AuthService.getAccessToken()}`;
      }
      return headers;
  }

  static async get(path: string) {
    const input: RequestInfo = `${API_ENDPOINT}${path}`;
    const headers: HeadersInit = await this.getHeaders();
    const init: RequestInit = {
      method: 'GET',
      headers
    };
    const response = await fetch(input, init);
    if (response.status === 403) {
      throw new Error('Access Forbidden');
    }
    return response.json();
  }

  static async post(path: any, entity: any, json = true) {
    const input = `${API_ENDPOINT}${path}`;
    const headers = await this.getHeaders();
    const init = {
      method: 'POST',
      headers,
      body: JSON.stringify(entity)
    };
    const response = await fetch(input, init);
    if (json) {
      return response.json();
    }
    return response;
  }

  static async put(path: any, entity: any) {
    const input = `${API_ENDPOINT}${path}`;
    const headers = await this.getHeaders();
    const init = {
      method: 'PUT',
      headers,
      body: JSON.stringify(entity)
    };
    const response = await fetch(input, init);
    return response.json();
  }

  static async delete(path: any, id: any) {
    const input = `${API_ENDPOINT}${path}/${id}`;
    const headers = await this.getHeaders();
    const init = {
      method: 'DELETE',
      headers
    };
    const response = await fetch(input, init);
    return response.json();
  }
}

export default APIService;
