# Calculetes

> Mathematics for JavaScript.

This project is a library for mathematical calculations. It currently supports:

- Definite integrals using Riemann sums
- Numerical derivatives using finite difference methods
- Probability calculations
- Utility functions for mathematical operations

## Installation

```sh
npm install calculetes
# or
bun add calculetes
```

## Usage

### Integrals

To calculate definite integrals using the Integral class:

```typescript
import { Integral } from "calculetes";

// Create an instance with desired precision
const integral = new Integral({ partitions: 10000 });

// Calculate the integral of x² from 0 to 1
const result = integral.calculate((x) => x * x, { from: 0, to: 1 });
console.log(result); // Approximately 0.33333...
```

### Derivatives

To calculate numerical derivatives using the Derivative class:

```typescript
import { Derivative } from "calculetes";

// Create an instance with desired configuration
const derivative = new Derivative({
  stepSize: 0.0001,
  method: "central", // 'forward', 'central', or 'backward'
});

// Calculate the first derivative of x² at x=2
const firstDerivative = derivative.calculate((x) => x * x, { at: 2 });
console.log(firstDerivative); // Approximately 4

// Calculate the second derivative
const secondDerivative = derivative.calculate((x) => x * x, {
  at: 2,
  order: 2,
});
console.log(secondDerivative); // Approximately 2
```

### Probabilities

To calculate probabilities using the probability functions:

```typescript
import {
  simpleProbability,
  conditionalProbability,
  binomialProbability,
} from "calculetes";

// Calculate a simple probability (3 out of 6 outcomes)
const simple = simpleProbability(3, 6);
console.log(simple); // 0.5

// Calculate conditional probability P(A|B) = P(A∩B)/P(B)
const conditional = conditionalProbability(0.2, 0.5);
console.log(conditional); // 0.4

// Calculate binomial probability (2 successes in 5 trials with p=0.5)
const binomial = binomialProbability(5, 2, 0.5);
console.log(binomial); // Approximately 0.3125
```

### Utility Functions

The library also provides utility functions for calculations:

```typescript
import { partitionInterval, evaluateFunctionAtPoints } from "calculetes";

// Divide an interval into equal parts
const points = partitionInterval(0, 10, 5);
console.log(points); // [0, 2, 4, 6, 8, 10]

// Evaluate a function at multiple points
const values = evaluateFunctionAtPoints((x) => x * x, points);
console.log(values); // [0, 4, 16, 36, 64, 100]
```

## Configuration Options

### Integral Options

- partitions: Number of subintervals to use (default: 10000)

### Derivative Options

- stepSize: Size of the step for numerical approximation (default: 0.0001)
- method: Method of approximation - 'forward', 'central', or 'backward' (default: 'central')

## Full API Reference

### Integral Class

- `new Integral(options)`: Creates a new instance with specified options
  - `options.partitions`: Number of subintervals (default: 10000)
- `integral.calculate(func, config)`: Calculates the definite integral of `func` from `config.from` to `config.to`

### Derivative Class

- `new Derivative(options)`: Creates a new instance with specified options
  - `options.stepSize`: Size of the step for numerical approximation (default: 0.0001)
  - `options.method`: Method of approximation - 'forward', 'central', or 'backward' (default: 'central')
- `derivative.calculate(func, config)`: Calculates the derivative of `func` at `config.at` with order `config.order` (default: 1)

### Probability Functions

- `simpleProbability(favorableOutcomes, totalOutcomes)`: Calculates P(A) = favorable outcomes / total outcomes
- `conditionalProbability(intersectionProbability, conditionProbability)`: Calculates P(A|B) = P(A∩B) / P(B)
- `jointProbabilityIndependent(probabilities)`: Calculates P(A∩B∩C...) = P(A) _ P(B) _ P(C) \* ... for independent events
- `bayesProbability(priorProbability, likelihood, marginalProbability)`: Calculates Bayes' theorem P(A|B) = P(B|A) \* P(A) / P(B)
- `unionProbability(probabilityA, probabilityB, intersectionProbability)`: Calculates P(A∪B) = P(A) + P(B) - P(A∩B)
- `complementProbability(probability)`: Calculates P(A') = 1 - P(A)
- `factorial(n)`: Calculates n! = n _ (n-1) _ ... _ 2 _ 1
- `permutations(n, k)`: Calculates P(n,k) = n!/(n-k)!
- `combinations(n, k)`: Calculates C(n,k) = n!/[k!(n-k)!]
- `binomialProbability(n, k, p)`: Calculates binomial probability P(X=k) = C(n,k) _ p^k _ (1-p)^(n-k)
- `expectedValue(values, probabilities)`: Calculates expected value of a discrete random variable

### Utility Functions

- `partitionInterval(from, to, partitions)`: Creates an array of evenly spaced points in the interval [from, to]
- `evaluateFunctionAtPoints(func, points)`: Evaluates a function at each point in an array

## Testing

To run the tests:

```sh
bun test
```

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
