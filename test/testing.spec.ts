import { expect } from "chai";

function hello (l:string) {
  return l;
}
describe("Typescript + Babel usage suite", () => {
  it("should return string correctly", () => {
    expect(hello("mocha"), "Hello mocha");
  });

  it("should return string correctly", () => {
    expect(hello("mochaddd"), "Hello mocha").to.equal("Hello mocha");
  });
}); 