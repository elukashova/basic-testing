import { simpleCalculator, Action } from './index';

const testCases = [
  {
    message: 'should add two numbers',
    a: 1,
    b: 2,
    action: Action.Add,
    expected: 3,
  },
  {
    message: 'should add two numbers',
    a: 2,
    b: 2,
    action: Action.Add,
    expected: 4,
  },
  {
    message: 'should add two numbers',
    a: 3,
    b: 2,
    action: Action.Add,
    expected: 5,
  },

  {
    message: 'should subtract two numbers',
    a: 1,
    b: 2,
    action: Action.Subtract,
    expected: -1,
  },
  {
    message: 'should subtract two numbers',
    a: 2,
    b: 2,
    action: Action.Subtract,
    expected: 0,
  },
  {
    message: 'should subtract two numbers',
    a: 3,
    b: 2,
    action: Action.Subtract,
    expected: 1,
  },

  {
    message: 'should multiply two numbers',
    a: 1,
    b: 2,
    action: Action.Multiply,
    expected: 2,
  },
  {
    message: 'should multiply two numbers',
    a: 2,
    b: 2,
    action: Action.Multiply,
    expected: 4,
  },
  {
    message: 'should multiply two numbers',
    a: 3,
    b: 2,
    action: Action.Multiply,
    expected: 6,
  },

  {
    message: 'should divide two numbers',
    a: 8,
    b: 2,
    action: Action.Divide,
    expected: 4,
  },
  {
    message: 'should divide two numbers',
    a: 24,
    b: 2,
    action: Action.Divide,
    expected: 12,
  },
  {
    message: 'should divide two numbers',
    a: 9,
    b: 3,
    action: Action.Divide,
    expected: 3,
  },

  {
    message: 'should exponentiate two numbers',
    a: 1,
    b: 1,
    action: Action.Exponentiate,
    expected: 1,
  },
  {
    message: 'should exponentiate two numbers',
    a: 4,
    b: 4,
    action: Action.Exponentiate,
    expected: 256,
  },
  {
    message: 'should exponentiate two numbers',
    a: 6,
    b: 6,
    action: Action.Exponentiate,
    expected: 46656,
  },

  {
    message: 'should return null for invalid action',
    a: 1,
    b: 1,
    action: 'action',
    expected: null,
  },
  {
    message: 'should return null for invalid action',
    a: 4,
    b: 4,
    action: 'action',
    expected: null,
  },
  {
    message: 'should return null for invalid action',
    a: 6,
    b: 6,
    action: 'action',
    expected: null,
  },

  {
    message: 'should return null for invalid arguments',
    a: 1,
    b: '1',
    action: Action.Multiply,
    expected: null,
  },
  {
    message: 'should return null for invalid arguments',
    a: undefined,
    b: 4,
    action: Action.Exponentiate,
    expected: null,
  },
  {
    message: 'should return null for invalid arguments',
    a: 6,
    b: null,
    action: Action.Divide,
    expected: null,
  },
];

describe('simpleCalculator', () => {
  test.each(testCases)('$message', ({ expected, ...testCase }) => {
    expect(simpleCalculator(testCase)).toBe(expected);
  });
});
