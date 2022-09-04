import { HTTPTransport, HTTPTransportOptions } from '../services/httpTransport';
import { parseJson } from '../utils/parseJson';

type ApiOptions = {
  timeout?: number;
  data?: XMLHttpRequestBodyInit;
  headers?: Record<string, string>;
  withCredentials?: boolean;
};

export class BaseAPI {
  private _basePath: string = 'https://ya-praktikum.tech/api/v2';
  private _api: HTTPTransport;
  private _headers: Record<string, string>;

  constructor(path: string = `/`) {
    this._api = new HTTPTransport(`${this._basePath}${path}`);
    this._headers = { 'Content-type': 'application/json; charset="UTF-8"' };
  }

  private prepareOptionsForSend(optionsForApi?: ApiOptions): HTTPTransportOptions {
    const optionsForSend = optionsForApi || ({} as ApiOptions);
    optionsForSend.headers = optionsForApi?.headers || this._headers;
    return optionsForSend as HTTPTransportOptions;
  }

  public prepareResponse(responseFromApi) {
    const respAfterParser = parseJson(responseFromApi);
    return respAfterParser;
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
