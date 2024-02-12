import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const result = generateLinkedList([3, 6, 9]);
    expect(result).toStrictEqual({
      next: {
        next: {
          next: {
            next: null,
            value: null,
          },
          value: 9,
        },
        value: 6,
      },
      value: 3,
    });
  });

  test('should generate linked list from values 2', () => {
    const result = generateLinkedList([3, 6, 9]);
    expect(result).toMatchSnapshot();
  });
});
