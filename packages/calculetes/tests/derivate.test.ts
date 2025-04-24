import { Derivative } from "../src/derivative";

describe("Derivative", () => {
  describe("first-order derivatives", () => {
    const deriv = new Derivative();

    test("derivative of x² at x=2 should be approximately 4", () => {
      const result = deriv.calculate((x) => x * x, { at: 2 });
      expect(result).toBeCloseTo(4, 4);
    });

    test("derivative of x³ at x=3 should be approximately 27", () => {
      const result = deriv.calculate((x) => x * x * x, { at: 3 });
      expect(result).toBeCloseTo(27, 4);
    });

    test("derivative of sin(x) at x=0 should be approximately 1", () => {
      const result = deriv.calculate(Math.sin, { at: 0 });
      expect(result).toBeCloseTo(1, 4);
    });

    test("derivative of cos(x) at x=0 should be approximately 0", () => {
      const result = deriv.calculate(Math.cos, { at: 0 });
      expect(result).toBeCloseTo(0, 4);
    });

    test("derivative of e^x at x=1 should be approximately e", () => {
      const result = deriv.calculate(Math.exp, { at: 1 });
      expect(result).toBeCloseTo(Math.exp(1), 4);
    });

    test("derivative of ln(x) at x=1 should be approximately 1", () => {
      const result = deriv.calculate(Math.log, { at: 1 });
      expect(result).toBeCloseTo(1, 4);
    });
  });

  // Higher-order derivatives
  describe("higher-order derivatives", () => {
    const deriv = new Derivative();

    test("second derivative of x² should be approximately 2", () => {
      const result = deriv.calculate((x) => x * x, { at: 5, order: 2 });
      expect(result).toBeCloseTo(2, 4);
    });

    test("third derivative of x³ should be approximately 6", () => {
      const result = deriv.calculate((x) => x * x * x, { at: 3, order: 3 });
      expect(result).toBeCloseTo(6, 3);
    });

    test("second derivative of sin(x) at x=0 should be approximately 0", () => {
      const result = deriv.calculate(Math.sin, { at: 0, order: 2 });
      expect(result).toBeCloseTo(0, 4);
    });

    test("second derivative of cos(x) at x=0 should be approximately -1", () => {
      const result = deriv.calculate(Math.cos, { at: 0, order: 2 });
      expect(result).toBeCloseTo(-1, 4);
    });
  });

  // Different methods
  describe("different approximation methods", () => {
    const derivateForward = new Derivative({ method: "forward" });
    const derivateBackward = new Derivative({ method: "backward" });
    const derivatecentral = new Derivative({ method: "central" });

    test("forward difference for x² at x=2", () => {
      const result = derivateForward.calculate((x) => x * x, { at: 2 });
      expect(result).toBeCloseTo(4, 2); // Forward difference is less accurate
    });

    test("backward difference for x² at x=2", () => {
      const result = derivateBackward.calculate((x) => x * x, { at: 2 });
      expect(result).toBeCloseTo(4, 2); // Backward difference is less accurate
    });

    test("central difference for x² at x=2", () => {
      const result = derivatecentral.calculate((x) => x * x, { at: 2 });
      expect(result).toBeCloseTo(4, 4); // Central difference is most accurate
    });
  });

  // Step size effects
  describe("step size effects", () => {
    test("smaller step size typically improves accuracy", () => {
      const standardDeriv = new Derivative({ stepSize: 0.001 });
      const preciseDeriv = new Derivative({ stepSize: 0.0001 });

      const standardResult = standardDeriv.calculate(Math.sin, {
        at: Math.PI / 4,
      });

      const preciseResult = preciseDeriv.calculate(Math.sin, {
        at: Math.PI / 4,
      });

      const exactValue = Math.cos(Math.PI / 4);

      const standardError = Math.abs(standardResult - exactValue);
      const preciseError = Math.abs(preciseResult - exactValue);

      expect(preciseError).toBeLessThan(standardError);
    });
  });

  describe("error handling", () => {
    const deriv = new Derivative();

    test("throws error for non-positive order", () => {
      expect(() => {
        deriv.calculate((x) => x * x, { at: 2, order: 0 });
      }).toThrow("Order must be a positive integer");
    });
  });
});
