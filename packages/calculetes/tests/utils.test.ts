import {
  partitionInterval,
  evaluateFunctionAtPoints,
} from "../src/utils/calculationHelpers.js";

describe("Utility Functions", () => {
  describe("partitionInterval", () => {
    test("divides [0, 1] into 4 equal partitions", () => {
      const result = partitionInterval(0, 1, 4);
      expect(result).toHaveLength(5); // 4 partitions means 5 points
      expect(result[0]).toBe(0);
      expect(result[1]).toBeCloseTo(0.25);
      expect(result[2]).toBeCloseTo(0.5);
      expect(result[3]).toBeCloseTo(0.75);
      expect(result[4]).toBe(1);
    });

    test("divides [-5, 5] into 2 equal partitions", () => {
      const result = partitionInterval(-5, 5, 2);
      expect(result).toHaveLength(3); // 2 partitions means 3 points
      expect(result[0]).toBe(-5);
      expect(result[1]).toBe(0);
      expect(result[2]).toBe(5);
    });

    test("handles zero partitions by returning array with only endpoints", () => {
      const result = partitionInterval(10, 20, 0);
      expect(result).toHaveLength(1);
      expect(result[0]).toBe(10);
    });

    test("handles large number of partitions correctly", () => {
      const partitions = 1000;
      const result = partitionInterval(0, 10, partitions);
      expect(result).toHaveLength(partitions + 1);
      expect(result[0]).toBe(0);
      expect(result[partitions]).toBe(10);
      expect(result[partitions / 2]).toBeCloseTo(5);
    });

    test("handles reversed interval (from > to)", () => {
      const result = partitionInterval(10, 0, 5);
      expect(result).toHaveLength(6);
      expect(result[0]).toBe(10);
      expect(result[5]).toBe(0);
      expect(result[2]).toBeCloseTo(6);
    });

    test("handles tiny intervals correctly", () => {
      const result = partitionInterval(0.0001, 0.0002, 5);
      expect(result).toHaveLength(6);
      expect(result[0]).toBe(0.0001);
      expect(result[5]).toBe(0.0002);
      expect(result[3]).toBeCloseTo(0.00016);
    });

    test("handles negative intervals correctly", () => {
      const result = partitionInterval(-10, -5, 5);
      expect(result).toHaveLength(6);
      expect(result[0]).toBe(-10);
      expect(result[5]).toBe(-5);
      expect(result[2]).toBeCloseTo(-8);
    });
  });

  describe("evaluateFunctionAtPoints", () => {
    test("evaluates x² at several points", () => {
      const square = (x: number) => x * x;
      const result = evaluateFunctionAtPoints(square, [1, 2, 3]);
      expect(result).toEqual([1, 4, 9]);
    });

    test("evaluates sin(x) over a partitioned interval", () => {
      const points = [0, Math.PI / 2, Math.PI];
      const result = evaluateFunctionAtPoints(Math.sin, points);
      expect(result[0]).toBeCloseTo(0);
      expect(result[1]).toBeCloseTo(1);
      expect(result[2]).toBeCloseTo(0);
    });

    test("handles empty array", () => {
      const result = evaluateFunctionAtPoints((x) => x, []);
      expect(result).toEqual([]);
    });

    test("evaluates complex functions", () => {
      const complexFunc = (x: number) => Math.pow(x, 3) - 2 * x + 5;
      const points = [-2, -1, 0, 1, 2];
      const expected = [1, 6, 5, 4, 9];
      const result = evaluateFunctionAtPoints(complexFunc, points);

      for (let i = 0; i < result.length; i++) {
        expect(result[i]).toBeCloseTo(expected[i]);
      }
    });

    test("evaluates exponential functions", () => {
      const expFunc = (x: number) => Math.exp(x);
      const points = [0, 1, 2];
      const result = evaluateFunctionAtPoints(expFunc, points);

      expect(result[0]).toBeCloseTo(1);
      expect(result[1]).toBeCloseTo(Math.E);
      expect(result[2]).toBeCloseTo(Math.E * Math.E);
    });

    test("evaluates logarithmic functions", () => {
      const logFunc = (x: number) => Math.log(x);
      const points = [1, Math.E, Math.E * Math.E];
      const result = evaluateFunctionAtPoints(logFunc, points);

      expect(result[0]).toBeCloseTo(0);
      expect(result[1]).toBeCloseTo(1);
      expect(result[2]).toBeCloseTo(2);
    });

    test("evaluates function with partitionInterval output", () => {
      const points = partitionInterval(0, 3, 3);
      const result = evaluateFunctionAtPoints((x) => x * 2, points);

      expect(result).toEqual([0, 2, 4, 6]);
    });
  });
});
