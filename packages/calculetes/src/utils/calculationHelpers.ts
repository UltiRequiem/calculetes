/**
 * Creates an array of evenly spaced points within a given interval.
 *
 * @param from - The starting point of the interval
 * @param to - The ending point of the interval
 * @param partitions - The number of partitions to divide the interval into
 * @returns An array of numbers representing partition points, including both endpoints
 *
 * @example
 * // Divide [0, 1] into 4 equal partitions
 * const points = partitionInterval(0, 1, 4);
 * // Result: [0, 0.25, 0.5, 0.75, 1]
 *
 * @example
 * // Divide [-5, 5] into 2 equal partitions
 * const points = partitionInterval(-5, 5, 2);
 * // Result: [-5, 0, 5]
 */
export function partitionInterval(
  from: number,
  to: number,
  partitions: number
): number[] {
  if (partitions < 0) {
    throw new Error("Number of partitions must be non-negative");
  }

  if (partitions === 0) {
    return [from];
  }

  const step = (to - from) / partitions;
  return Array.from({ length: partitions + 1 }, (_, i) => from + i * step);
}

/**
 * Evaluates a function at each point in an array of values.
 *
 * @param func - The function to evaluate (must take a number and return a number)
 * @param points - Array of x-values where the function should be evaluated
 * @returns Array of function outputs corresponding to each input point
 *
 * @example
 * // Evaluate x² at several points
 * const square = (x) => x * x;
 * const values = evaluateFunctionAtPoints(square, [1, 2, 3]);
 * // Result: [1, 4, 9]
 *
 * @example
 * // Evaluate sin(x) over a partitioned interval
 * const points = partitionInterval(0, Math.PI, 2);
 * const values = evaluateFunctionAtPoints(Math.sin, points);
 * // Result: [0, 1, 0]
 */
export function evaluateFunctionAtPoints<T>(
  func: (x: number) => T,
  points: number[]
): T[] {
  return points.map(func);
}
