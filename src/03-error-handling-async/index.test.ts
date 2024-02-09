// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
} from './index';
// import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 'Some value';
    expect.assertions(1);
    try {
      const result = await resolveValue(value);
      expect(result).toBe(value);
    } catch (_) {}
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const message = 'Some message';
    try {
      throwError(message);
    } catch (error: unknown) {
      if (error instanceof Error) {
        expect(JSON.stringify(error.message)).toMatch(message);
      }
    }
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultMessage = 'Oops!';
    try {
      throwError();
    } catch (error: unknown) {
      if (error instanceof Error) {
        expect(JSON.stringify(error.message)).toMatch(defaultMessage);
      }
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    try {
      throwCustomError();
    } catch (error: unknown) {
      expect(error instanceof MyAwesomeError).toBeTruthy();
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    // Write your test here
  });
});
