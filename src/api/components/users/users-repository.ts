import { PrismaClient } from "@prisma/client";

const User = new PrismaClient().user;

/**
 * Get a list of users
 * @param {{ search: string, }} query
 * @returns {Promise}
 */
async function getUsers(request: any) {
  const pageNumber = Number(request.query.page_number || 1);
  const pageSize = Number(request.query.page_size || 5);

  const [searchColumn, searchQuery] = String(request.query.search).split(":");
  const sort = String(request.query.sort).split(":");

  const sortColumn = sort[0] || undefined;
  const sortQuery: "asc" | "desc" | undefined =
    sort[1] == "asc" || sort[1] == "desc" ? sort[1] : undefined;

  const query = {
    where:
      searchColumn == "name" || searchColumn == "email"
        ? {
            name:
              searchColumn == "name"
                ? {
                    contains: searchQuery,
                  }
                : undefined,
            email:
              searchColumn == "email"
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
        : sortColumn == "email"
        ? {
            email: sortQuery,
          }
        : undefined,
    take: pageSize,
    skip: (pageNumber - 1) * pageSize,
  };

  const result = await User.findMany(query);

  const count = await User.count({
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
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id: number) {
  return await User.findUnique({ where: { id: id } });
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name: string, email: string, password: string) {
  return await User.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id: number, name: string, email: string) {
  return await User.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      email: email,
    },
  });
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id: number) {
  return await User.delete({ where: { id: id } });
}

export { getUsers, getUser, createUser, updateUser, deleteUser };
