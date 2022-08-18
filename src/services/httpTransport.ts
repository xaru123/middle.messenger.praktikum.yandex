interface TransportOptions {
  method: string;
  timeout?: number;
  data: XMLHttpRequestBodyInit;
  headers?: string[];
}

export default class HTTPTransport {
  static METHODS: Record<string, string> = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE',
  };

  get = (url: string, options: TransportOptions) => {
    return this.request(url, { ...options, method: HTTPTransport.METHODS.GET }, options.timeout);
  };
  put = (url: string, options: TransportOptions) => {
    return this.request(url, { ...options, method: HTTPTransport.METHODS.PUT }, options.timeout);
  };
  post = (url: string, options: TransportOptions) => {
    return this.request(url, { ...options, method: HTTPTransport.METHODS.POST }, options.timeout);
  };
  delete = (url: string, options: TransportOptions) => {
    return this.request(url, { ...options, method: HTTPTransport.METHODS.DELETE }, options.timeout);
  };

  request = (url: string, options: TransportOptions, timeout: number = 5000) => {
    const { headers = {}, method, data } = options;
    const self = this;
    return new Promise(function (resolve, reject) {
      if (!method) {
        reject(new Error('something bad happened'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === HTTPTransport.METHODS.GET;

      xhr.open(method, isGet && !!data ? `${url}${self.queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };

  queryStringify(data: XMLHttpRequestBodyInit) {
    return Object.keys(data)
      .map(function (k, i) {
        return (i == 0 ? `?${k}` : k) + '=' + data[k];
      })
      .join('&');
  }
}
