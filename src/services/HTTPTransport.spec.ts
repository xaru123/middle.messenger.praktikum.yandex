import { HTTPTransport, HTTPTransportOptions } from './HTTPTransport';

describe('Testing class HTTPTransport', () => {
  const TestXHR = new HTTPTransport();
  const url = 'https://mocki.io/v1/2001a607-7def-43b3-aea1-f2e9ce97e104';
  it('Send get', (done) => {
    const props = { method: 'GET', data: {} } as HTTPTransportOptions;
    TestXHR.get(url, props)
      .then(({ response }) => {
        const json = JSON.parse(response);
        console.log(json)
        if (json.length === 4) {
          done();
        } else {
          done(new Error('Не тот набор данных'));
        }
      })
      .catch(done);
  });
});
