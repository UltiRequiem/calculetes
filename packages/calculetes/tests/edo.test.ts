import { rk4 } from '../src/edo';

describe('RK4 EDO Solver', () => {
  const tolerance = 1e-4; // Tolerance for comparing numerical and analytical solutions

  // Test case 1: dy/dx = y, y(0) = 1. Analytical solution: y(x) = e^x
  test('should solve dy/dx = y with y(0) = 1', () => {
    const f1 = (x, y) => y;
    const x0_1 = 0;
    const y0_1 = 1;
    const h1 = 0.1; // Step size
    const n1 = 10;  // Number of steps to reach x = 1.0

    const analyticalSolution1 = (x) => Math.exp(x);

    const yValues1 = rk4(f1, x0_1, y0_1, h1, n1);

    // Check values at several points
    // x = 0 (initial condition)
    expect(yValues1[0]).toBeCloseTo(analyticalSolution1(0), tolerance);

    // x = 0.5 (intermediate point, step 5)
    let x_step5 = x0_1 + 5 * h1;
    expect(yValues1[5]).toBeCloseTo(analyticalSolution1(x_step5), tolerance);
    
    // x = 1.0 (final point, step 10)
    let x_step10 = x0_1 + n1 * h1;
    expect(yValues1[n1]).toBeCloseTo(analyticalSolution1(x_step10), tolerance);
  });

  // Test case 2: dy/dx = x*y, y(0) = 1. Analytical solution: y(x) = e^(x^2/2)
  test('should solve dy/dx = x*y with y(0) = 1', () => {
    const f2 = (x, y) => x * y;
    const x0_2 = 0;
    const y0_2 = 1;
    const h2 = 0.1; // Step size
    const n2 = 10;  // Number of steps to reach x = 1.0

    const analyticalSolution2 = (x) => Math.exp(x * x / 2);

    const yValues2 = rk4(f2, x0_2, y0_2, h2, n2);

    // Check values at several points
    // x = 0 (initial condition)
    expect(yValues2[0]).toBeCloseTo(analyticalSolution2(0), tolerance);

    // x = 0.5 (intermediate point, step 5)
    let x_step5_2 = x0_2 + 5 * h2;
    expect(yValues2[5]).toBeCloseTo(analyticalSolution2(x_step5_2), tolerance);

    // x = 1.0 (final point, step 10)
    let x_step10_2 = x0_2 + n2 * h2;
    expect(yValues2[n2]).toBeCloseTo(analyticalSolution2(x_step10_2), tolerance);
  });
});
