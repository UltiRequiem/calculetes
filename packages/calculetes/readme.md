# Riemann Integral Library

This project is a TypeScript library that calculates definite integrals using Riemann sums. It provides an `Integral` class that allows users to compute integrals of functions over specified intervals.

## Usage

To use the `Integral` class, import it into your TypeScript file:

```typescript
import { Integral } from "./src/index";
```

### Creating an Integral Instance

You can create an instance of the `Integral` class with optional configuration parameters:

```typescript
const integral = new Integral({ partitions: 1000 });
```

### Calculating an Integral

To calculate the integral of a function, use the `calculate` method. This method accepts a function and a configuration object with `from` and `to` properties:

```typescript
const result = integral.calculate((x) => x * x, { from: 0, to: 1 });
console.log(result); // Output will be the integral result
```

## Testing

To run the tests, use the following command:

```
npm test
```

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
