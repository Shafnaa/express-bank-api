import * as accountsRepository from "./accounts-repository";
import { Request } from "express";

/**
 * Get list of accounts
 * @param {Request} request - Request object
 * @returns {Array}
 */
export async function getAccounts(request: Request) {
  const { page, result } = await accountsRepository.getAccounts(request);

  const results = [];

  for (let i = 0; i < result.length; i += 1) {
    const account = result[i];
    results.push({
      id: account.id,
      name: account.name,
      balance: account.balance,
    });
  }

  return { page, results };
}

/**
 * Get account detail
 * @param {number} id - Account ID
 * @returns {Object}
 */
export async function getAccount(id: number) {
  const account = await accountsRepository.getAccount(id);

  // Account not found
  if (!account) {
    return null;
  }

  return {
    id: account.id,
    name: account.name,
    balance: account.balance,
  };
}

/**
 * Create new account
 * @param {string} name - Name
 * @param {number} balance - Balance
 * @param {number} userId - User ID
 * @returns {boolean}
 */
export async function createAccount(
  name: string,
  balance: number,
  userId: number
) {
  try {
    await accountsRepository.createAccount(name, balance, userId);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing account
 * @param {number} id - Account ID
 * @param {string} name - Name
 * @returns {boolean}
 */
export async function updateAccount(id: number, name: string) {
  const account = await accountsRepository.getAccount(id);

  // Account not found
  if (!account) {
    return null;
  }

  try {
    await accountsRepository.updateAccount(id, name);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete account
 * @param {number} id - Account ID
 * @returns {boolean}
 */
export async function deleteAccount(id: number) {
  const account = await accountsRepository.getAccount(id);

  // Account not found
  if (!account) {
    return null;
  }

  try {
    await accountsRepository.deleteAccount(id);
  } catch (err) {
    return null;
  }

  return true;
}
