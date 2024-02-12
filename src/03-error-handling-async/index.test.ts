import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const providedValue = 'provided value';
    await expect(resolveValue(providedValue)).resolves.toBe(providedValue);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const providedMessage = 'provided message';
    expect(() => throwError(providedMessage)).toThrow(providedMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultMessage = 'Oops!';
    expect(() => throwError()).toThrow(defaultMessage);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const notImportedCustomError = 'custom error';
    expect(() => throwCustomError()).toThrowError(MyAwesomeError);
    expect(() => throwCustomError()).toThrowError(notImportedCustomError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrowError(MyAwesomeError);
  });
});
