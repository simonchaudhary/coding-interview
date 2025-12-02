import { endpoints } from "@/config/endpoints";

import { axiosClient } from "@/lib/axiosClient";

import type { SushiFormValues } from "@/schemas/sushiSchema";
import type { Sushi, SushiQueryParams } from "../types";

/**
 * Normalizes sushi data to ensure price is a number
 * @param {any} data - Raw sushi data from API
 * @returns {Sushi} Normalized sushi data
 */
function normalizeSushiData(data: Sushi): Sushi {
  return {
    ...data,
    price: Number(data.price),
  };
}

/**
 * Fetches the sushi list from the API
 * @param {SushiQueryParams} params - Query parameters for filtering and sorting
 * @param {AbortSignal} signal - Abort signal for canceling the request
 * @returns {Promise<Sushi[]>} Array of sushi items
 */
export async function fetchSushi(
  params: SushiQueryParams,
  signal: AbortSignal
): Promise<Sushi[]> {
  const { data } = await axiosClient.get<Sushi[]>(endpoints.sushi.list, {
    params,
    signal,
  });

  return data.map(normalizeSushiData);
}

/**
 * Creates a new sushi item
 * @param {SushiFormValues} sushi - The sushi data to create
 * @returns {Promise<Sushi>} The created sushi item
 */
export async function createSushi(sushi: SushiFormValues): Promise<Sushi> {
  const { data } = await axiosClient.post<Sushi>(endpoints.sushi.create, sushi);

  return normalizeSushiData(data);
}

/**
 * Fetches a single sushi item by ID
 * @param {string} id - The ID of the sushi item
 * @param {AbortSignal} signal - Abort signal for canceling the request
 * @returns {Promise<Sushi>} The sushi item
 */
export async function fetchSushiById(
  id: string,
  signal: AbortSignal
): Promise<Sushi> {
  const { data } = await axiosClient.get<Sushi>(endpoints.sushi.detail(id), {
    signal,
  });

  return normalizeSushiData(data);
}

/**
 * Deletes a sushi item by ID
 * @param {string} id - The ID of the sushi item to delete
 * @returns {Promise<void>}
 */
export async function deleteSushi(id: string): Promise<void> {
  await axiosClient.delete(endpoints.sushi.delete(id));
}
