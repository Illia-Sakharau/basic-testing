// Uncomment the code below and write your tests
import axios from 'axios';
import lodash from 'lodash';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

jest.mock('lodash', () => {
  const originalModule = jest.requireActual<typeof lodash>('lodash');

  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((cb) => cb),
  };
});

const relativePath = '/test';
const data = 'Some response data';

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.mocked(axios.create).mockImplementation(() => axios);
    jest
      .mocked(axios.get)
      .mockImplementation(() => Promise.resolve({ data: data }));
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relativePath);
    expect(jest.mocked(axios.create)).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(relativePath);
    expect(jest.mocked(axios.get)).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const respData = await throttledGetDataFromApi(relativePath);
    expect(respData).toBe(data);
  });
});
