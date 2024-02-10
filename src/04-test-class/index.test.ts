// Uncomment the code below and write your tests
import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
} from '.';

const initialBalance = 10;
let testAccount: BankAccount;

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    testAccount = getBankAccount(initialBalance);
    expect(testAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect.assertions(1);
    try {
      testAccount.withdraw(20);
    } catch (error) {
      expect(error instanceof InsufficientFundsError).toBeTruthy();
    }
  });

  test('should throw error when transferring more than balance', () => {
    const destAccount = getBankAccount(10);
    expect.assertions(1);
    try {
      testAccount.transfer(20, destAccount);
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
    // Write your test here
  });

  test('should withdraw money', () => {
    // Write your test here
  });

  test('should transfer money', () => {
    // Write your test here
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
  });
});
