// TODO use .env for developer's local config
import AuthService from './AuthService';

const API_ENDPOINT = 'http://localhost:5000/api';
// const API_ENDPOINT = 'http://34.212.27.73:5000/api';

// const { API_ENDPOINT } = process.env;

class APIService {
  static getHeaders(isFormURLEncoded?: boolean): HeadersInit {
      const headers: HeadersInit = isFormURLEncoded ?
        {'Content-Type': 'application/x-www-form-urlencoded'} : {'Content-Type': 'application/json'};
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

  static async postDocument(file: File) {
    const path = '/documents';
    const input = `${API_ENDPOINT}${path}`;
    // const headers = await this.getHeaders(true);
    const headers = {
      Authorization: `Bearer ${AuthService.getAccessToken()}`
      // 'Content-Type': 'multipart/form-data'
    };
    const formdata = new FormData();
    formdata.append('img', file, file.name);
    formdata.append('payload.id', '5e66c791a055d78324d059e5');
    formdata.append('body.type', 'Driver\'s License');
    const init = {
      method: 'POST',
      headers,
      body: formdata
    };
    const response = await fetch(input, init);
    return response.json();
  }

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjZjNzkxYTA1NWQ3ODMyNGQwNTllNSIsInVzZXJuYW1lIjoic2FsbHlvd25lciIsInJvbGUiOiJvd25lciIsImV4cCI6MTU4ODk4MDU1NSwiaWF0IjoxNTgzNzk2NTU1fQ.-Wih4GaVGQQIm3P-E0dVJaUPlxRUpzGLsI4Ov1gp79g");
//   myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
//

//
//   var requestOptions = {
//     method: 'POST',
//     headers: myHeaders,
//     body: formdata,
//     redirect: 'follow'
//   };
//
//   fetch("http://localhost:5000/api/documents", requestOptions)
// .then(response => response.text())
// .then(result => console.log(result))
// .catch(error => console.log('error', error));

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
