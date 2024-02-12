import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({
      a: 1011,
      b: 1013,
      action: Action.Add,
    });

    expect(result).toBe(2024);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({
      a: 2024,
      b: 1013,
      action: Action.Subtract,
    });

    expect(result).toBe(1011);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({
      a: 2024,
      b: 1013,
      action: Action.Multiply,
    });

    expect(result).toBe(2050312);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({
      a: 2050312,
      b: 1013,
      action: Action.Divide,
    });

    expect(result).toBe(2024);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 24,
      b: 2,
      action: Action.Exponentiate,
    });

    expect(result).toBe(576);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({
      a: 1011,
      b: 1013,
      action: 'action',
    });

    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: '24',
      b: '2',
      action: Action.Add,
    });

    expect(result).toBeNull();
  });
});
