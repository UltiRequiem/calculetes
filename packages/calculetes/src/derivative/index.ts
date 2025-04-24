/**
 * Configuration options for the derivative calculator
 */
export interface DerivativeCalculatorProps {
  /** Step size for numerical approximation (smaller = more accurate but may cause precision issues) */
  stepSize?: number;
  /** Method to use for approximation */
  method?: "forward" | "central" | "backward";
}

/**
 * Parameters for calculating a derivative
 */
export interface DerivativeCalculation {
  /** The point at which to calculate the derivative */
  at: number;
  /** Which derivative to calculate (1 = first derivative, 2 = second derivative, etc.) */
  order?: number;
}

/**
 * Class for numerical differentiation of functions
 */
export class Derivative {
  public stepSize: number;
  public method: "forward" | "central" | "backward";

  /**
   * Create a new derivative calculator
   */
  public constructor({
    stepSize = 0.0001,
    method = "central",
  }: DerivativeCalculatorProps = {}) {
    this.stepSize = stepSize;
    this.method = method;
  }

  /**
   * Calculate the derivative of a function at a specified point
   * @returns The derivative value
   */
  public calculate(
    func: (x: number) => number,
    config: DerivativeCalculation
  ): number {
    const { at, order = 1 } = config;

    if (order < 1) {
      throw new Error("Order must be a positive integer");
    }

    if (order > 1) {
      const derivFunc = (x: number) =>
        this.calculate(func, { at: x, order: 1 });

      return this.calculate(derivFunc, { at, order: order - 1 });
    }

    switch (this.method) {
      case "forward":
        return (func(at + this.stepSize) - func(at)) / this.stepSize;

      case "backward":
        return (func(at) - func(at - this.stepSize)) / this.stepSize;

      case "central":
      default:
        return (
          (func(at + this.stepSize) - func(at - this.stepSize)) /
          (2 * this.stepSize)
        );
    }
  }
}
