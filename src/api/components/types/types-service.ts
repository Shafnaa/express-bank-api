import * as typesRepository from "./types-repository";
import { Request } from "express";

/**
 * Get list of types
 * @param {Request}
 * @returns {Array}
 */
export async function getTypes(request: Request) {
  const { page, result } = await typesRepository.getTypes(request);

  const results = [];

  for (let i = 0; i < result.length; i += 1) {
    const type = result[i];
    results.push({
      id: type.id,
      name: type.name,
    });
  }

  return { page, results };
}

/**
 * Get type detail
 * @param {number} id - Type ID
 * @returns {Object}
 */
export async function getType(id: number) {
  const type = await typesRepository.getType(id);

  // Type not found
  if (!type) {
    return null;
  }

  return {
    id: type.id,
    name: type.name,
  };
}

/**
 * Create new type
 * @param {string} name - Name
 * @returns {boolean}
 */
export async function createType(name: string) {
  try {
    await typesRepository.createType(name);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing type
 * @param {number} id - Type ID
 * @param {string} name - Name
 * @returns {boolean}
 */
export async function updateType(id: number, name: string) {
  const type = await typesRepository.getType(id);

  // Type not found
  if (!type) {
    return null;
  }

  try {
    await typesRepository.updateType(id, name);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete type
 * @param {number} id - Type ID
 * @returns {boolean}
 */
export async function deleteType(id: number) {
  const type = await typesRepository.getType(id);

  // Type not found
  if (!type) {
    return null;
  }

  try {
    await typesRepository.deleteType(id);
  } catch (err) {
    return null;
  }

  return true;
}
