export default function debounce(func: Function, time: number): Function {
  let isCooldown: boolean = false;
  return (...args) => {
    if (isCooldown) {
      return;
    }
    /* eslint no-invalid-this: ["off"]*/
    func.apply(this, args);
    isCooldown = true;
    setTimeout(() => (isCooldown = false), time);
  };
}
