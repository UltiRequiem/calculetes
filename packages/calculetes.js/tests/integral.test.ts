import { Integral } from "../src/integral";

describe("Integral Class", () => {
  let integral: Integral;

  beforeEach(() => {
    integral = new Integral({ partitions: 1000 });
  });

  test("calculates the integral of a simple linear function", () => {
    const result = integral.calculate((x) => x, { from: 0, to: 1 });
    expect(result).toBeCloseTo(0.5);
  });

  test("calculates the integral of a quadratic function", () => {
    const result = integral.calculate((x) => x * x, { from: 0, to: 2 });
    expect(result).toBeCloseTo(2.66667);
  });

  test("calculates the integral of a sine function", () => {
    const result = integral.calculate(Math.sin, { from: 0, to: Math.PI });
    expect(result).toBeCloseTo(2);
  });
});
