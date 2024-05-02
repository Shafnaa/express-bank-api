import * as accountsService from "./accounts-service";
import { errorResponder, errorTypes } from "../../../core/errors";
import { Request, Response, NextFunction } from "express";

/**
 * Handle get list of accounts request
 * @param {Request} request - Express request object
 * @param {Response} response - Express response object
 * @param {NextFunction} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
export async function getAccounts(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { page, results } = await accountsService.getAccounts(request);

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
 * Handle get account detail request
 * @param {Request} request - Express request object
 * @param {Response} response - Express response object
 * @param {NextFunction} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
export async function getAccount(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const account = await accountsService.getAccount(Number(request.params.id));

    if (!account) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, "Unknown account");
    }

    return response.status(200).json(account);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle create account request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
export async function createAccount(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const name = request.body.name;
    const balance = request.body.balance;
    const userId = request.user?.id || 0;

    const success = await accountsService.createAccount(name, balance, userId);

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        "Failed to create account"
      );
    }

    return response.status(200).json({ name, balance });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle update account request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
export async function updateAccount(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const id = request.params.id;
    const name = request.body.name;

    const success = await accountsService.updateAccount(Number(id), name);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        "Failed to update account"
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle delete account request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
export async function deleteAccount(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const id = request.params.id;

    const success = await accountsService.deleteAccount(Number(id));
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        "Failed to delete account"
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}
