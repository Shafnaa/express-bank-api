import * as usersService from "./users-service";
import { errorResponder, errorTypes } from "../../../core/errors";

/**
 * Handle get list of users request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getUsers(request: any, response: any, next: any) {
  try {
    const { page, results } = await usersService.getUsers(request);

    const totalPage = Math.ceil(page.count / page.pageSize);

    return response.status(200).json({
      page_number: page.pageNumber,
      page_size: page.pageSize,
      count: page.count,
      total_pages: totalPage,
      has_previous_page: page.pageNumber > 1,
      has_next_page: page.pageNumber < totalPage,
      data: results,
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle get user detail request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getUser(request: any, response: any, next: any) {
  try {
    const user = await usersService.getUser(request.params.id);

    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, "Unknown user");
    }

    return response.status(200).json(user);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle create user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function createUser(request: any, response: any, next: any) {
  try {
    const name = request.body.name;
    const email = request.body.email;
    const password = request.body.password;

    const success = await usersService.createUser(name, email, password);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        "Failed to create user"
      );
    }

    return response.status(200).json({ name, email });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle update user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function updateUser(request: any, response: any, next: any) {
  try {
    const id = request.params.id;
    const name = request.body.name;
    const email = request.body.email;

    const success = await usersService.updateUser(id, name, email);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        "Failed to update user"
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle delete user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function deleteUser(request: any, response: any, next: any) {
  try {
    const id = request.params.id;

    const success = await usersService.deleteUser(id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        "Failed to delete user"
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

export { getUsers, getUser, createUser, updateUser, deleteUser };
