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
  beforeEach(() => {
    testAccount = getBankAccount(initialBalance);
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
