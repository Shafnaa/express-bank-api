import { PrismaClient } from "@prisma/client";
import { Request } from "express";

const Account = new PrismaClient().account;

/**
 * Get a list of accounts
 * @param {Request} request - Request object
 * @returns {Promise}
 */
export async function getAccounts(request: Request) {
  const id = Number(request.user?.id) || undefined;

  const enableAll = String(request.query.enableAll) == "True";

  const pageNumber = Number(request.query.page_number || 1);
  const pageSize = Number(request.query.page_size || 5);

  const [searchColumn, searchQuery] = String(request.query.search).split(":");
  const sort = String(request.query.sort).split(":");

  const sortColumn = sort[0] || undefined;
  const sortQuery: "asc" | "desc" | undefined =
    sort[1] == "asc" || sort[1] == "desc" ? sort[1] : undefined;

  const query = {
    where: {
      name:
        searchColumn == "name"
          ? {
              contains: searchQuery,
            }
          : undefined,
      id: enableAll ? undefined : id,
    },
    orderBy:
      sortColumn == "name"
        ? {
            name: sortQuery,
          }
        : sortColumn == "id"
        ? {
            email: sortQuery,
          }
        : undefined,
    take: pageSize,
    skip: (pageNumber - 1) * pageSize,
  };

  const result = await Account.findMany(query);

  const count = await Account.count({
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
 * Get account detail
 * @param {number} id - Account ID
 * @returns {Promise}
 */
export async function getAccount(id: number) {
  return await Account.findUnique({ where: { id: id } });
}

/**
 * Create new account
 * @param {string} name - Name
 * @param {number} balance - Balance
 * @param {number} userId - User ID
 * @returns {Promise}
 */
export async function createAccount(
  name: string,
  balance: number,
  userId: number
) {
  const result = await Account.create({
    data: {
      name: name,
      balance: balance,
      userId: userId,
    },
  });

  return result;
}

/**
 * Update existing account
 * @param {number} id - Account ID
 * @param {string} name - Name
 * @returns {Promise}
 */
export async function updateAccount(id: number, name: string) {
  return await Account.update({
    where: { id: id },
    data: { name: name },
  });
}

/**
 * Delete a account
 * @param {number} id - Account ID
 * @returns {Promise}
 */
export async function deleteAccount(id: number) {
  return await Account.delete({ where: { id: id } });
}
