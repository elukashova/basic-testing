import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => {
  const originalModule = jest.requireActual<typeof import('lodash')>('lodash');
  return {
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  const url = 'https://jsonplaceholder.typicode.com';
  const relativePath = '/todos/1';
  const mock = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    mock.create = jest.fn(() => mock);
    mock.get.mockImplementationOnce(() =>
      Promise.resolve({ data: relativePath }),
    );
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relativePath);
    expect(mock.create).lastCalledWith({ baseURL: url });
  });

  test('should perform request to correct provided url', async () => {
    mock.get.mockImplementationOnce(() =>
      Promise.resolve({ data: relativePath }),
    );
    await throttledGetDataFromApi(relativePath);
    expect(mock.get).lastCalledWith(relativePath);
  });

  test('should return response data', async () => {
    mock.get.mockResolvedValueOnce(relativePath);
    const result = await throttledGetDataFromApi(relativePath);
    expect(result).toEqual(relativePath);
  });
});
