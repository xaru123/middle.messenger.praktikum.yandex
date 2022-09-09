export function queryStringify(data: XMLHttpRequestBodyInit) {
  return Object.keys(data)
    .map(function (k, i) {
      return (i == 0 ? `?${k}` : k) + '=' + data[k];
    })
    .join('&');
}
