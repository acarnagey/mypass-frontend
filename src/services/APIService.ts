// TODO use .env for developer's local config
// const API_ENDPOINT = 'http://localhost:5000/api';
const API_ENDPOINT = 'http://34.212.27.73:5000/api';
// const API_ENDPOINT = 'http://54.245.189.252:3000/api';

// const { API_ENDPOINT } = process.env;

class APIService {
  static async getHeaders() {
      return {
        'Content-Type': 'application/json'
      };
  }

  static async get(path: any) {
    const input = `${API_ENDPOINT}${path}`;
    const headers = await this.getHeaders();
    const init = {
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
