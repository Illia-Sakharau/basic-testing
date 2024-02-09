// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = {
      a: 0.1,
      b: 0.2,
      action: Action.Add,
    };
    const expectedResult = 0.3;

    expect(simpleCalculator(input)).toBeCloseTo(expectedResult);
  });

  test('should subtract two numbers', () => {
    const input = {
      a: 3,
      b: 0.2,
      action: Action.Subtract,
    };
    const expectedResult = 2.8;

    expect(simpleCalculator(input)).toBeCloseTo(expectedResult);
  });

  test('should multiply two numbers', () => {
    const input = {
      a: 3,
      b: 0.2,
      action: Action.Multiply,
    };
    const expectedResult = 0.6;

    expect(simpleCalculator(input)).toBeCloseTo(expectedResult);
  });

  test('should divide two numbers', () => {
    // Write your test here
  });

  test('should exponentiate two numbers', () => {
    // Write your test here
  });

  test('should return null for invalid action', () => {
    // Write your test here
  });

  test('should return null for invalid arguments', () => {
    // Write your test here
  });
});
