export default function debounce(func: Function, time: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    /* eslint no-invalid-this: ["off"]*/
    timeout = setTimeout(() => func.apply(this, args), time);
  };
}
