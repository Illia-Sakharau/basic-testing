// Uncomment the code below and write your tests
import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

jest.mock('lodash', () => ({
  random: () => 1,
}));
const initialBalance = 10;
let testAccount: BankAccount;

describe('BankAccount', () => {
  beforeEach(() => {
    testAccount = getBankAccount(initialBalance);
  });

  afterAll(() => {
    jest.unmock('lodash');
  });

  test('should create account with initial balance', () => {
    expect(testAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect.assertions(1);
    try {
      testAccount.withdraw(initialBalance * 2);
    } catch (error) {
      expect(error instanceof InsufficientFundsError).toBeTruthy();
    }
  });

  test('should throw error when transferring more than balance', () => {
    const destAccount = getBankAccount(10);
    expect.assertions(1);
    try {
      testAccount.transfer(initialBalance * 2, destAccount);
    } catch (error) {
      expect(error instanceof InsufficientFundsError).toBeTruthy();
    }
  });

  test('should throw error when transferring to the same account', () => {
    expect.assertions(1);
    try {
      testAccount.transfer(20, testAccount);
    } catch (error) {
      expect(error instanceof TransferFailedError).toBeTruthy();
    }
  });

  test('should deposit money', () => {
    const deposit = 20;
    testAccount.deposit(deposit);

    expect(testAccount.getBalance()).toBe(initialBalance + deposit);
  });

  test('should withdraw money', () => {
    testAccount.withdraw(initialBalance);

    expect(testAccount.getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    const destAccount = getBankAccount(initialBalance);
    testAccount.transfer(initialBalance, destAccount);

    expect(destAccount.getBalance()).toBe(initialBalance * 2);
    expect(testAccount.getBalance()).toBe(0);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const resp = await testAccount.fetchBalance();
    expect(resp).toBe(1);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const newBalance = 5;
    const spy = jest
      .spyOn(testAccount, 'fetchBalance')
      .mockImplementation(() => new Promise((res) => res(newBalance)));

    await testAccount.synchronizeBalance();
    expect(testAccount.getBalance()).toBe(newBalance);

    spy.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const spy = jest
      .spyOn(testAccount, 'fetchBalance')
      .mockImplementation(() => new Promise((res) => res(null)));
    expect.assertions(1);

    try {
      await testAccount.synchronizeBalance();
    } catch (error) {
      expect(error instanceof SynchronizationFailedError).toBeTruthy();
    }

    spy.mockRestore();
  });
});
