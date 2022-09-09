export function parseJson(strangeObject: XMLHttpRequest, field: string = 'response') {
  if (!strangeObject[field]) {
    return {};
  }
  if (strangeObject[field] == 'OK') {
    return { status: 'OK' };
  }
  return JSON.parse(strangeObject[field]);
}
