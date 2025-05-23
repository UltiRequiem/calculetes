/**
 * Solves an ordinary differential equation using the Runge-Kutta 4th order (RK4) method.
 *
 * @param {function(number, number): number} f - The function representing the ODE (dy/dx = f(x, y)).
 * @param {number} x0 - The initial value of x.
 * @param {number} y0 - The initial value of y.
 * @param {number} h - The step size.
 * @param {number} n - The number of steps to take.
 * @returns {number[]} An array of y values at each step.
 */
export function rk4(f, x0, y0, h, n) {
  let x = x0;
  let y = y0;
  const yValues = [y0];

  for (let i = 0; i < n; i++) {
    const k1 = h * f(x, y);
    const k2 = h * f(x + h / 2, y + k1 / 2);
    const k3 = h * f(x + h / 2, y + k2 / 2);
    const k4 = h * f(x + h, y + k3);

    y = y + (k1 + 2 * k2 + 2 * k3 + k4) / 6;
    x = x + h;
    yValues.push(y);
  }

  return yValues;
}
