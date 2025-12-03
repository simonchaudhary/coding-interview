import { endpoints } from "@/config/endpoints";

import { axiosClient } from "@/lib/axiosClient";

import type { SushiFormValues } from "@/schemas/sushiSchema";
import type { Sushi, SushiQueryParams } from "../types";

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

  return data;
}

/**
 * Creates a new sushi item
 * @param {SushiFormValues} sushi - The sushi data to create
 * @returns {Promise<Sushi>} The created sushi item
 */
export async function createSushi(sushi: SushiFormValues): Promise<Sushi> {
  const payload = {
    ...sushi,
    price: Number(sushi.price),
  };

  const { data } = await axiosClient.post<Sushi>(endpoints.sushi.create, payload);

  return data;
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

  return data;
}

/**
 * Deletes a sushi item by ID
 * @param {string} id - The ID of the sushi item to delete
 * @returns {Promise<void>}
 */
export async function deleteSushi(id: string): Promise<void> {
  await axiosClient.delete(endpoints.sushi.delete(id));
}
