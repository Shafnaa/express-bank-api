import * as typesService from "./types-service";
import { errorResponder, errorTypes } from "../../../core/errors";
import { Request, Response, NextFunction } from "express";

/**
 * Handle get list of types request
 * @param {Request} request - Express request object
 * @param {Response} response - Express response object
 * @param {NextFunction} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
export async function getTypes(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { page, results } = await typesService.getTypes(request);

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
 * Handle get type detail request
 * @param {Request} request - Express request object
 * @param {Response} response - Express response object
 * @param {NextFunction} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
export async function getType(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const type = await typesService.getType(Number(request.params.id));

    if (!type) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, "Unknown type");
    }

    return response.status(200).json(type);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle create type request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
export async function createType(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const name = request.body.name;

    const success = await typesService.createType(name);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        "Failed to create type"
      );
    }

    return response.status(200).json({ name });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle update type request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
export async function updateType(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const id = request.params.id;
    const name = request.body.name;

    const success = await typesService.updateType(Number(id), name);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        "Failed to update type"
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle delete type request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
export async function deleteType(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const id = request.params.id;

    const success = await typesService.deleteType(Number(id));
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        "Failed to delete type"
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}
