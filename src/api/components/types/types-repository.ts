import { PrismaClient } from "@prisma/client";
import { Request } from "express";

const Type = new PrismaClient().type;

/**
 * Get a list of users
 * @returns {Promise}
 */
export async function getTypes(request: Request) {
  const pageNumber = Number(request.query.page_number || 1);
  const pageSize = Number(request.query.page_size || 5);

  const [searchColumn, searchQuery] = String(request.query.search).split(":");
  const sort = String(request.query.sort).split(":");

  const sortColumn = sort[0] || undefined;
  const sortQuery: "asc" | "desc" | undefined =
    sort[1] == "asc" || sort[1] == "desc" ? sort[1] : undefined;

  const query = {
    where:
      searchColumn == "name" || searchColumn == "id"
        ? {
            name:
              searchColumn == "name"
                ? {
                    contains: searchQuery,
                  }
                : undefined,
            email:
              searchColumn == "id"
                ? {
                    contains: searchQuery,
                  }
                : undefined,
          }
        : undefined,
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

  const result = await Type.findMany(query);

  const count = await Type.count({
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
 * @param {number} id - Type ID
 * @returns {Promise}
 */
export async function getType(id: number) {
  return await Type.findUnique({ where: { id: id } });
}

/**
 * Create new user
 * @param {string} name - Name
 * @returns {Promise}
 */
export async function createType(name: string) {
  const result = await Type.create({
    data: {
      name: name,
    },
  });

  return result;
}

/**
 * Update existing user
 * @param {number} id - Type ID
 * @param {string} name - Name
 * @returns {Promise}
 */
export async function updateType(id: number, name: string) {
  return await Type.update({
    where: { id: id },
    data: { name: name },
  });
}

/**
 * Delete a user
 * @param {number} id - Type ID
 * @returns {Promise}
 */
export async function deleteType(id: number) {
  return await Type.delete({ where: { id: id } });
}
