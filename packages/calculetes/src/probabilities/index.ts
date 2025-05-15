/**
 * Calculates simple probability: P(A) = favorable outcomes / total outcomes
 */
export function simpleProbability(
  favorableOutcomes: number,
  totalOutcomes: number
): number {
  if (totalOutcomes <= 0) {
    throw new RangeError("Total outcomes must be greater than zero");
  }

  return favorableOutcomes / totalOutcomes;
}

/**
 * Calculates conditional probability: P(A|B) = P(A ∩ B) / P(B)
 */
export function conditionalProbability(
  intersectionProbability: number,
  conditionProbability: number
): number {
  if (conditionProbability <= 0) {
    throw new Error("Condition probability must be greater than 0");
  }

  return intersectionProbability / conditionProbability;
}

/**
 * Calculates joint probability for independent events: P(A ∩ B) = P(A) * P(B)
 */
export function jointProbabilityIndependent(probabilities: number[]): number {
  return probabilities.reduce((acc, p) => acc * p, 1);
}

/**
 * Calculates probability using Bayes' theorem: P(A|B) = P(B|A) * P(A) / P(B)
 */
export function bayesProbability(
  priorProbability: number,
  likelihood: number,
  marginalProbability: number
): number {
  return (likelihood * priorProbability) / marginalProbability;
}

/**
 * Calculates probability of union: P(A ∪ B) = P(A) + P(B) - P(A ∩ B)
 */
export function unionProbability(
  probabilityA: number,
  probabilityB: number,
  intersectionProbability: number
): number {
  return probabilityA + probabilityB - intersectionProbability;
}

/**
 * Calculates probability of the complement: P(A') = 1 - P(A)
 */
export function complementProbability(probability: number): number {
  return 1 - probability;
}

/**
 * Calculates factorial: n! = n * (n-1) * ... * 2 * 1
 */
export function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) {
    throw new Error("Number must be a non-negative integer");
  }

  let result = 1;

  for (let i = 2; i <= n; i++) {
    result *= i;
  }

  return result;
}

/**
 * Calculates permutations: P(n,k) = n!/(n-k)!
 */
export function permutations(n: number, k: number): number {
  if (k > n) return 0;

  return factorial(n) / factorial(n - k);
}

/**
 * Calculates combinations: C(n,k) = n!/[k!(n-k)!]
 */
export function combinations(n: number, k: number): number {
  if (k > n) return 0;

  return factorial(n) / (factorial(k) * factorial(n - k));
}

/**
 * Calculates binomial probability: P(X = k) = C(n,k) * p^k * (1-p)^(n-k)
 */
export function binomialProbability(n: number, k: number, p: number): number {
  return combinations(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

/**
 * Calculates expected value of a discrete random variable
 */
export function expectedValue(
  values: number[],
  probabilities: number[]
): number {
  if (values.length !== probabilities.length) {
    throw new Error("Values and probabilities must have the same length");
  }

  return values.reduce((sum, value, i) => sum + value * probabilities[i]!, 0);
}
