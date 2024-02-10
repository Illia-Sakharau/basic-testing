// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';
import fsProm from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 30000;
    const spy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(spy).toHaveBeenCalledWith(callback, timeout);
    spy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 30000;

    doStuffByTimeout(callback, timeout);
    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(timeout);
    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 30000;
    const spy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, timeout);

    expect(spy).toHaveBeenCalledWith(callback, timeout);
    spy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const timeout = 30000;

    doStuffByInterval(callback, timeout);
    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(timeout * 2);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const pathToFile = 'some/path/to.file';
    const spy = jest.spyOn(path, 'join');

    await readFileAsynchronously(pathToFile);
    expect(spy).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockImplementation(() => false);

    expect(await readFileAsynchronously('')).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'Some file content';
    jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
    jest
      .spyOn(fsProm, 'readFile')
      .mockImplementation(() => new Promise((res) => res(fileContent)));

    expect(await readFileAsynchronously('')).toBe(fileContent);
  });
});
