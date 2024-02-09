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
    // Write your test here
  });

  test('should multiply two numbers', () => {
    // Write your test here
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
