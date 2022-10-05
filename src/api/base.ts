import env from '../utils/env';
import { HTTPTransport, HTTPTransportOptions } from '../services/httpTransport';
import { parseJson } from '../utils/parseJson';

type ApiOptions = {
  timeout?: number;
  data?: XMLHttpRequestBodyInit;
  headers?: Record<string, string>;
  withCredentials?: boolean;
};

export class BaseAPI {
  private _api: HTTPTransport;
  private _headers: Record<string, string>;

  constructor(path: string = `/`) {
    this._api = new HTTPTransport(`${env.SWAGGER_API}${path}`);
    this._headers = { 'Content-type': 'application/json; charset="UTF-8"' };
  }

  private prepareOptionsForSend(optionsForApi: ApiOptions = {}) {
    const optionsForSend = {
      ...optionsForApi,
      headers: optionsForApi.headers || this._headers,
    };
    return optionsForSend as HTTPTransportOptions;
  }

  public prepareResponse(responseFromApi) {
    return parseJson(responseFromApi);
  }

  public post(url, options?: ApiOptions) {
    return this._api
      .post(url, this.prepareOptionsForSend(options))
      .then((responseFromApi) => this.prepareResponse(responseFromApi));
  }

  public get(url, options?: ApiOptions) {
    return this._api
      .get(url, this.prepareOptionsForSend(options))
      .then((responseFromApi) => this.prepareResponse(responseFromApi));
  }

  public put(url, options?: ApiOptions) {
    return this._api
      .put(url, this.prepareOptionsForSend(options))
      .then((responseFromApi) => this.prepareResponse(responseFromApi));
  }

  public delete(url, options?: ApiOptions) {
    return this._api
      .delete(url, this.prepareOptionsForSend(options))
      .then((responseFromApi) => this.prepareResponse(responseFromApi));
  }
}
