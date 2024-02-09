import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'node:path';
import fs from 'node:fs';

const callback = jest.fn();
const timeout = 1000;

describe('doStuffByTimeout', () => {
  let spy: jest.SpyInstance;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    spy = jest.spyOn(global, 'setTimeout');
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(callback, timeout);
    expect(spy).toBeCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(timeout);
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  let spy: jest.SpyInstance;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    spy = jest.spyOn(global, 'setInterval');
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(callback, timeout);
    expect(spy).toBeCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(callback, timeout);

    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(4);
  });
});

describe('readFileAsynchronously', () => {
  let pathSpy: jest.SpyInstance;

  beforeEach(() => {
    pathSpy = jest.spyOn(path, 'join');
  });

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously('file-to-read.md');
    expect(pathSpy).toHaveBeenCalled();
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously('file-to-read.md');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'file content';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(fileContent);
    await expect(readFileAsynchronously('file-to-read.md')).resolves.toBe(
      fileContent,
    );
  });
});
