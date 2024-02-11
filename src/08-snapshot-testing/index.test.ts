// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const testResult = generateLinkedList(['val1', 'val2']);
    expect(testResult).toStrictEqual({
      next: {
        next: {
          next: null,
          value: null,
        },
        value: 'val2',
      },
      value: 'val1',
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const testResult = generateLinkedList(['val1', 'val2', 'val3']);
    expect(testResult).toMatchSnapshot();
  });
});
