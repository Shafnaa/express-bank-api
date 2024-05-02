import * as transactionsService from "./transactions-service";
import { errorResponder, errorTypes } from "../../../core/errors";
import { Request, Response, NextFunction } from "express";

/**
 * Handle get list of transactions request
 * @param {Request} request - Express request object
 * @param {Response} response - Express response object
 * @param {NextFunction} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
export async function getTransactions(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { page, results } = await transactionsService.getTransactions(
      request
    );

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
 * Handle get transaction detail request
 * @param {Request} request - Express request object
 * @param {Response} response - Express response object
 * @param {NextFunction} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
export async function getTransaction(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const transaction = await transactionsService.getTransaction(
      Number(request.params.id)
    );

    if (!transaction) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        "Unknown transaction"
      );
    }

    return response.status(200).json(transaction);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle create transaction request
 * @param {Request} request - Express request object
 * @param {Response} response - Express response object
 * @param {NextFunction} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
export async function createTransaction(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const note = request.body.note;
    const amount = request.body.amount;
    const typeId = request.body.typeId;
    const fromAccountId = request.body.fromAccountId;
    const toAccountId = request.body.toAccountId;

    const success = await transactionsService.createTransaction(
      note,
      amount,
      typeId,
      fromAccountId,
      toAccountId
    );

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        "Failed to create transaction"
      );
    }

    return response.status(200).json({ note, amount });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle update transaction request
 * @param {Request} request - Express request object
 * @param {Response} response - Express response object
 * @param {NextFunction} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
export async function updateTransaction(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const id = request.params.id;
    const note = request.body.note;

    const success = await transactionsService.updateTransaction(
      Number(id),
      note
    );
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        "Failed to update transaction"
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle delete transaction request
 * @param {Request} request - Express request object
 * @param {Response} response - Express response object
 * @param {NextFunction} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
export async function deleteTransaction(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const id = request.params.id;

    const success = await transactionsService.deleteTransaction(Number(id));
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        "Failed to delete transaction"
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}
