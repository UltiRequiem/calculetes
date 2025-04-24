export interface IntegralCalculatorProps {
  partitions?: number;
}

export interface IntegralCalculation {
  from: number;
  to: number;
}

export class Integral {
  public partitions: number;

  public constructor({ partitions = 10000 }: IntegralCalculatorProps) {
    this.partitions = partitions;
  }

  public calculate(
    func: (x: number) => number,
    config: IntegralCalculation
  ): number {
    const { from, to } = config;

    const coefficient = from > to ? -1 : 1;

    const deltaX = (to - from) / this.partitions;
    let sum = 0;

    for (let i = 0; i < this.partitions; i++) {
      const xSubI = from + i * deltaX;
      sum += func(xSubI) * deltaX;
    }

    return coefficient * sum;
  }
}
