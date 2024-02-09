import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  const initialBalance = 100;
  let account: BankAccount;
  let amountForOperation: number;

  beforeEach(() => {
    account = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    amountForOperation = initialBalance + 1;
    expect(() => account.withdraw(amountForOperation)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const accountForTransfer = getBankAccount(initialBalance);
    amountForOperation = initialBalance + 1;
    expect(() =>
      account.transfer(amountForOperation, accountForTransfer),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(initialBalance, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const accountForDeposit = getBankAccount(initialBalance);
    accountForDeposit.deposit(initialBalance);
    const newBalance = initialBalance * 2;
    expect(accountForDeposit.getBalance()).toBe(newBalance);
  });

  test('should withdraw money', () => {
    amountForOperation = initialBalance / 2;
    account.withdraw(amountForOperation);
    const newBalance = initialBalance - amountForOperation;
    expect(account.getBalance()).toBe(newBalance);
  });

  test('should transfer money', () => {
    const accountForTransfer = getBankAccount(initialBalance);
    amountForOperation = initialBalance / 2;
    account.transfer(amountForOperation, accountForTransfer);

    const newBalanceSourceAccount = initialBalance - amountForOperation;
    const newBalanceDestinationAccount = initialBalance + amountForOperation;

    expect(account.getBalance()).toBe(newBalanceSourceAccount);
    expect(accountForTransfer.getBalance()).toBe(newBalanceDestinationAccount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const numberToReturn = 10;
    const spy = jest.spyOn(lodash, 'random').mockReturnValue(numberToReturn);
    const fetchedBalance = await account.fetchBalance();
    expect(typeof fetchedBalance).toBe('number');
    expect(fetchedBalance).toBe(numberToReturn);
    spy.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const newBalance = 10;
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(newBalance);
    expect(account.getBalance()).toBe(initialBalance);
    await account.synchronizeBalance();
    expect(account.getBalance()).toEqual(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
