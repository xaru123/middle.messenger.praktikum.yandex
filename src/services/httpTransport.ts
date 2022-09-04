import { queryStringify } from '../utils/queryStringify';

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export type HTTPTransportOptions = {
  method: METHODS;
  data: XMLHttpRequestBodyInit;
  timeout?: number;
  headers?: Record<string, string>;
  withCredentials?: boolean;
};

export class HTTPTransport {
  public _baseURL: string;

  constructor(_baseURL: string = '') {
    this._baseURL = _baseURL;
  }

  public get = (url: string, options: HTTPTransportOptions): Promise<XMLHttpRequest> => {
    const { data } = options;
    if (!!data) {
      url += queryStringify(data);
    }
    return this.request(url, { ...options, method: METHODS.GET });
  };
  public put = (url: string, options: HTTPTransportOptions): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHODS.PUT });
  };
  public post = (url: string, options: HTTPTransportOptions): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHODS.POST });
  };
  public delete = (url: string, options: HTTPTransportOptions): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHODS.DELETE });
  };

  public request = (url: string, options: HTTPTransportOptions): Promise<XMLHttpRequest> => {
    const { method = METHODS.GET, timeout = 5000, data, headers = {}, withCredentials = false } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error(`Метода (${method}) не существует`));
        return;
      }

      const xhr = new window.XMLHttpRequest();
      xhr.open(method, `${this._baseURL}${url}`);
      xhr.timeout = timeout;
      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      if (withCredentials) {
        xhr.withCredentials = true;
      }
      xhr.onload = function () {
        if (xhr.status >= 300) {
          reject(xhr);
        } else {
          resolve(xhr);
        }
      };
      xhr.onabort = () => reject(xhr);
      xhr.onerror = () => reject(xhr);
      xhr.ontimeout = () => reject(xhr);

      if (!data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
