# Calculetes

> Mathematics for JavaScript.

This project is a library for mathematical calculations. It currently supports:

- Definite integrals using Riemann sums
- Numerical derivatives using finite difference methods

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

## Configuration Options

### Integral Options

- partitions: Number of subintervals to use (default: 10000)

### Derivative Options

- stepSize: Size of the step for numerical approximation (default: 0.0001)
- method: Method of approximation - 'forward', 'central', or 'backward' (default: 'central')

## Testing

To run the tests:

```sh
bun test
```

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
