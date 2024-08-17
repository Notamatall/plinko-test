export function randomInteger(min: number, max: number) {
  const random = Math.random();
  min = Math.round(min);
  max = Math.floor(max);

  return Math.floor(random * (max - min) + min);
}

export function factorial(n: number) {
  if (n === 0 || n === 1) {
    return 1;
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

export function binomialCoefficient(rowsCount: number, index: number) {
  return factorial(rowsCount) / (factorial(index) * factorial(rowsCount - index));
}

export function calculateProbability(rowsCount: number, index: number) {
  let binomCoeff = binomialCoefficient(rowsCount, index);
  let probability = binomCoeff * Math.pow(0.5, rowsCount);
  return (probability * 100).toFixed(4);
}

export function calculateReward(bet: number, multiplier: number) {
  return (bet * multiplier).toFixed(4);
}
