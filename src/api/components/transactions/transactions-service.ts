const transactionsRepository = require("./transactions-repository");
import { Request } from "express";

/**
 * Get list of transactions
 * @param {Request}
 * @returns {Array}
 */
export async function getTransactions(request: Request) {
  const { page, result } = await transactionsRepository.getTransactions(
    request
  );

  const results = [];

  for (let i = 0; i < result.length; i += 1) {
    const transaction = result[i];
    results.push({
      id: transaction.id,
      note: transaction.note,
      amount: transaction.amount,
      fromAccountId: transaction.fromAccountId,
      toAccountId: transaction.toAccountId,
    });
  }

  return { page, results };
}

/**
 * Get transaction detail
 * @param {number} id - Transaction ID
 * @returns {Object}
 */
export async function getTransaction(id: number) {
  const transaction = await transactionsRepository.getTransaction(id);

  // Transaction not found
  if (!transaction) {
    return null;
  }

  return {
    id: transaction.id,
    note: transaction.note,
    amount: transaction.amount,
  };
}

/**
 * Create new transaction
 * @param {string} note - Note
 * @param {number} amount - Amount
 * @param {number} typeId - Type ID
 * @param {number} fromAccountId - From Account ID
 * @param {number} toAccountId - To Account ID
 * @returns {boolean}
 */
export async function createTransaction(
  note: string,
  amount: number,
  typeId: number,
  fromAccountId: number,
  toAccountId: number
) {
  try {
    await transactionsRepository.createTransaction(
      note,
      amount,
      typeId,
      fromAccountId,
      toAccountId
    );
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing transaction
 * @param {number} id - Transaction ID
 * @param {string} note - Note
 * @returns {boolean}
 */
export async function updateTransaction(id: number, note: string) {
  const transaction = await transactionsRepository.getTransaction(id);

  // Transaction not found
  if (!transaction) {
    return null;
  }

  try {
    await transactionsRepository.updateTransaction(id, note);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete transaction
 * @param {number} id - Transaction ID
 * @returns {boolean}
 */
export async function deleteTransaction(id: number) {
  const transaction = await transactionsRepository.getTransaction(id);

  // Transaction not found
  if (!transaction) {
    return null;
  }

  try {
    await transactionsRepository.deleteTransaction(id);
  } catch (err) {
    return null;
  }

  return true;
}
