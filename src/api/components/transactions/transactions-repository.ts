import { PrismaClient } from "@prisma/client";
import { Request } from "express";

const prisma = new PrismaClient();

/**
 * Get a list of users
 * @returns {Promise}
 */
export async function getTransactions(request: Request) {
  const pageNumber = Number(request.query.page_number || 1);
  const pageSize = Number(request.query.page_size || 5);

  const [searchColumn, searchQuery] = String(request.query.search).split(":");
  const sort = String(request.query.sort).split(":");

  const sortColumn = sort[0] || undefined;
  const sortQuery: "asc" | "desc" | undefined =
    sort[1] == "asc" || sort[1] == "desc" ? sort[1] : undefined;

  const query = {
    where:
      searchColumn == "note"
        ? {
            note:
              searchColumn == "note"
                ? {
                    contains: searchQuery,
                  }
                : undefined,
          }
        : undefined,
    orderBy:
      sortColumn == "note"
        ? {
            note: sortQuery,
          }
        : sortColumn == "createdAt"
        ? {
            createdAt: sortQuery,
          }
        : sortColumn == "amount"
        ? {
            amount: sortQuery,
          }
        : undefined,
    take: pageSize,
    skip: (pageNumber - 1) * pageSize,
  };

  const result = await prisma.transaction.findMany(query);

  const count = await prisma.transaction.count({
    where: query.where,
  });

  return {
    page: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      count: count,
    },
    result,
  };
}

/**
 * Get user detail
 * @param {number} id - Transaction ID
 * @returns {Promise}
 */
export async function getTransaction(id: number) {
  const result = await prisma.transaction.findUnique({ where: { id: id } });

  return result;
}

/**
 * Create new user
 * @param {string} note - Note
 * @param {number} amount - Amount
 * @param {number} fromAccountId - From Account ID
 * @param {number} toAccountId - To Account ID
 * @returns {Promise}
 */
export async function createTransaction(
  note: string,
  amount: number,
  typeId: number,
  fromAccountId: number,
  toAccountId: number
) {
  const [fromAccount, toAccount] = await prisma.$transaction([
    prisma.account.findUnique({ where: { id: fromAccountId } }),
    prisma.account.findUnique({ where: { id: toAccountId } }),
  ]);

  const [result] = await prisma.$transaction([
    prisma.transaction.create({
      data: {
        note: note,
        amount: amount,
        typeId: typeId,
        fromAccountId: fromAccountId,
        toAccountId: toAccountId,
      },
    }),
    prisma.account.update({
      where: { id: fromAccountId },
      data: { balance: (fromAccount?.balance || 0) - amount },
    }),
    prisma.account.update({
      where: { id: toAccountId },
      data: { balance: (toAccount?.balance || 0) + amount },
    }),
  ]);

  return result;
}

/**
 * Update existing user
 * @param {number} id - Transaction ID
 * @param {string} note - Note
 * @returns {Promise}
 */
export async function updateTransaction(id: number, note: string) {
  const result = await prisma.transaction.update({
    where: { id: id },
    data: {
      note: note,
    },
  });

  return result;
}

/**
 * Delete a user
 * @param {string} id - Transaction ID
 * @returns {Promise}
 */
export async function deleteTransaction(id: number) {
  const result = await prisma.transaction.delete({ where: { id: id } });

  return result;
}
