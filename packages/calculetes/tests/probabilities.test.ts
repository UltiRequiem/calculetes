import {
  simpleProbability,
  conditionalProbability,
  jointProbabilityIndependent,
  bayesProbability,
  unionProbability,
  complementProbability,
  factorial,
  permutations,
  combinations,
  binomialProbability,
  expectedValue,
} from "../src/probabilities/index.js";

describe("Probability Functions", () => {
  describe("simpleProbability", () => {
    test("calculates simple probability correctly", () => {
      expect(simpleProbability(3, 6)).toBe(0.5);
      expect(simpleProbability(1, 4)).toBe(0.25);
      expect(simpleProbability(0, 10)).toBe(0);
    });

    test("throws error when total outcomes is not positive", () => {
      expect(() => simpleProbability(1, 0)).toThrow(RangeError);
      expect(() => simpleProbability(1, -5)).toThrow(RangeError);
    });
  });

  describe("conditionalProbability", () => {
    test("calculates conditional probability correctly", () => {
      expect(conditionalProbability(0.2, 0.5)).toBe(0.4);
      expect(conditionalProbability(0.1, 0.2)).toBe(0.5);
    });

    test("throws error when condition probability is not positive", () => {
      expect(() => conditionalProbability(0.1, 0)).toThrow();
      expect(() => conditionalProbability(0.1, -0.2)).toThrow();
    });
  });

  describe("jointProbabilityIndependent", () => {
    test("calculates joint probability for independent events", () => {
      expect(jointProbabilityIndependent([0.5, 0.5])).toBe(0.25);
      expect(jointProbabilityIndependent([0.2, 0.3, 0.4])).toBeCloseTo(0.024);
      expect(jointProbabilityIndependent([0.1, 0.1, 0.1, 0.1])).toBeCloseTo(
        0.0001
      );
    });

    test("returns 1 for empty array", () => {
      expect(jointProbabilityIndependent([])).toBe(1);
    });
  });

  describe("bayesProbability", () => {
    test("calculates Bayesian probability correctly", () => {
      // P(A|B) = P(B|A) * P(A) / P(B)
      // Example: P(Disease|Test+) = P(Test+|Disease) * P(Disease) / P(Test+)
      const sensitivity = 0.95; // P(Test+|Disease)
      const prevalence = 0.01; // P(Disease)
      const positiveRate = 0.05; // P(Test+)

      expect(
        bayesProbability(prevalence, sensitivity, positiveRate)
      ).toBeCloseTo(0.19);
    });
  });

  describe("unionProbability", () => {
    test("calculates probability of union correctly", () => {
      // P(A ∪ B) = P(A) + P(B) - P(A ∩ B)
      expect(unionProbability(0.3, 0.4, 0.1)).toBe(0.6);
      expect(unionProbability(0.5, 0.5, 0.25)).toBe(0.75);
    });
  });

  describe("complementProbability", () => {
    test("calculates probability of complement correctly", () => {
      // P(A') = 1 - P(A)
      expect(complementProbability(0.3)).toBe(0.7);
      expect(complementProbability(0)).toBe(1);
      expect(complementProbability(1)).toBe(0);
    });
  });

  describe("factorial", () => {
    test("calculates factorial correctly", () => {
      expect(factorial(0)).toBe(1);
      expect(factorial(1)).toBe(1);
      expect(factorial(5)).toBe(120);
      expect(factorial(10)).toBe(3628800);
    });

    test("throws error for negative numbers", () => {
      expect(() => factorial(-1)).toThrow();
    });

    test("throws error for non-integer numbers", () => {
      expect(() => factorial(1.5)).toThrow();
    });
  });

  describe("permutations", () => {
    test("calculates permutations correctly", () => {
      // P(n,k) = n!/(n-k)!
      expect(permutations(5, 2)).toBe(20);
      expect(permutations(10, 3)).toBe(720);
      expect(permutations(6, 6)).toBe(720);
      expect(permutations(4, 0)).toBe(1);
    });

    test("returns 0 when k > n", () => {
      expect(permutations(3, 4)).toBe(0);
    });
  });

  describe("combinations", () => {
    test("calculates combinations correctly", () => {
      // C(n,k) = n!/[k!(n-k)!]
      expect(combinations(5, 2)).toBe(10);
      expect(combinations(10, 3)).toBe(120);
      expect(combinations(6, 3)).toBe(20);
      expect(combinations(4, 0)).toBe(1);
      expect(combinations(7, 7)).toBe(1);
    });

    test("returns 0 when k > n", () => {
      expect(combinations(3, 4)).toBe(0);
    });
  });

  describe("binomialProbability", () => {
    test("calculates binomial probability correctly", () => {
      // P(X = k) = C(n,k) * p^k * (1-p)^(n-k)

      // Probability of getting exactly 2 heads in 5 coin flips (p=0.5)
      expect(binomialProbability(5, 2, 0.5)).toBeCloseTo(0.3125);

      // Probability of getting exactly 3 successes in 10 trials with p=0.2
      expect(binomialProbability(10, 3, 0.2)).toBeCloseTo(0.201);

      // Probability of getting 0 successes in 3 trials with p=0.1
      expect(binomialProbability(3, 0, 0.1)).toBeCloseTo(0.729);
    });
  });

  describe("expectedValue", () => {
    test("calculates expected value correctly", () => {
      // E[X] = Σ x_i * P(X = x_i)
      const values = [1, 2, 3, 4];
      const equalProbs = [0.25, 0.25, 0.25, 0.25];
      expect(expectedValue(values, equalProbs)).toBe(2.5);

      const diceValues = [1, 2, 3, 4, 5, 6];
      const diceProbs = [1 / 6, 1 / 6, 1 / 6, 1 / 6, 1 / 6, 1 / 6];
      expect(expectedValue(diceValues, diceProbs)).toBeCloseTo(3.5);

      // Biased coin (heads=1, tails=0) with P(heads)=0.7
      expect(expectedValue([0, 1], [0.3, 0.7])).toBe(0.7);
    });

    test("throws error when arrays have different lengths", () => {
      expect(() => expectedValue([1, 2, 3], [0.5, 0.5])).toThrow();
    });
  });
});
